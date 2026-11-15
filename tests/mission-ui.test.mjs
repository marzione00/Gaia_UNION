import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {GPU} from '../src/renderer.js';
import {UI} from '../src/ui/toolkit.js';
import {MissionUI} from '../src/education/mission-ui.js';
import {fresh} from '../src/store.js';
import {REFERENCE_SIGNAL} from '../src/models/signal.js';
import {checkMissions} from '../scripts/check-missions.mjs';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const definition=JSON.parse(readFileSync(root+'content/missions/echo08-signal.json','utf8'));
const metrics=JSON.parse(readFileSync(root+'assets/glyphs.json','utf8'));
function fixture(w=1600,h=1000) {
    const R=Object.create(GPU.prototype);Object.assign(R,{w,h,sceneWidth:w,sceneHeight:h,metrics,uiData:[],meshes:new Map(),frameStats:{},made:0});
    R.gl={SCISSOR_TEST:3089,DEPTH_BUFFER_BIT:256,DEPTH_TEST:2929,viewport(...args){R.viewport=args;},enable(){},disable(){},scissor(){},clear(){},depthMask(){}};
    R.makeMesh=(id,data)=>{R.made++;R.meshes.set(id,{...data,count:data.i.length});};R.deleteMesh=id=>R.meshes.delete(id);R.drawMesh=()=>{};
    const store={data:fresh(),persistent:true,save:()=>true},state={scene:'mission',yaw:0,pitch:.45};
    const api={state,route(scene,extra){Object.assign(state,{scene},extra);},openTheory(){},say(){},download(name,data){api.downloaded={name,data};}};
    const E=new MissionUI(R,store,definition,api),U=new UI(R);
    const draw=()=>{R.uiData=[];U.begin();E.drawUI(U,state);};
    const click=id=>{draw();const b=U.buttons.find(b=>b.id===id);assert.ok(b,id);assert.ok(!b.disabled,id+' enabled');U.activate(b,b.x+b.w/2);};
    return {R,E,U,store,state,api,draw,click};
}
test('mission geometry caches meshes and restores the original viewport',()=>{
    const {R,E,state}=fixture();E.draw3D(state);const n=R.made;assert.ok(n>0);E.time=4;E.draw3D(state);assert.equal(R.made,n);
    E.setParameters(REFERENCE_SIGNAL);E.draw3D(state);assert.ok(R.made>n);assert.deepEqual(R.viewport,[0,0,1600,1000]);
    E.scene.dispose();assert.equal(R.meshes.size,0);
});
test('mission controls: prediction, A/B, quiz feedback, diary and explicit completion',()=>{
    const {E,api,store,click,draw}=fixture();
    click('mission-predict-increases');click('mission-capture-A');click('mission-model-quadratic');
    for(let i=0;i<3;i++)click('mission-a-minus');
    assert.deepEqual(E.record.parameters,REFERENCE_SIGNAL);click('mission-predict-decreases');click('mission-capture-B');
    click('mission-step-4');
    for(let i=0;i<definition.questions.length;i++){
        const q=definition.questions[i];click('mission-answer-'+q.id+'-'+q.correct);assert.ok(E.showFeedback);
        if(i<definition.questions.length-1)click('mission-question-next');
    }
    click('mission-journal');assert.equal(api.state.journalTab,E.noteKey);assert.equal(api.state.scene,'journal');
    // Journal text is supplied explicitly here; this is a controller test, not a browser typing test.
    store.data.notes[E.noteKey]='La parabola coincide con i dati sintetici; non dimostra una legge naturale.';
    api.state.scene='mission';E.setStage(5);click('mission-limits');click('mission-complete');assert.ok(E.summary.completed);
    click('mission-report');assert.equal(api.downloaded.data.experiments.A.at2,3);assert.equal(api.downloaded.data.experiments.B.at2,3.25);
    const restored={...store.data,missions:structuredClone(store.data.missions)};store.data=restored;draw();assert.ok(E.summary.completed);
});
test('mission UI controls fit supported viewports across all levels, phases and questions',()=>{
    for(const [w,h] of [[1600,1000],[1280,720],[390,844]]){
        const f=fixture(w,h);
        for(const level of ['base','intermediate','advanced'])for(let stage=0;stage<6;stage++){
            f.E.setLevel(level);f.E.setStage(stage);
            for(const view of w<1050?['lesson','lab']:['lesson']){
                f.E.view=view;
                for(let question=0;question<(stage===4?4:1);question++){
                    f.E.question=question;f.draw();
                    const buttons=f.U.buttons;
                    for(const b of buttons)assert.ok(b.x>=0&&b.y>=98&&b.x+b.w<=w+.1&&b.y+b.h<=h-35,`${w}x${h} stage ${stage} q${question}: ${b.id}`);
                    for(let i=0;i<buttons.length;i++)for(let j=i+1;j<buttons.length;j++){
                        const a=buttons[i],b=buttons[j];
                        assert.ok(!(a.x<b.x+b.w-.1&&a.x+a.w>b.x+.1&&a.y<b.y+b.h-.1&&a.y+a.h>b.y+.1),`${w}x${h} ${a.id} overlaps ${b.id}`);
                    }
                }
            }
        }
    }
});
test('every quiz choice has a nonempty accessible label',()=>{
    const {E,U,draw}=fixture(390,844);E.setStage(4);
    for(let i=0;i<4;i++){E.question=i;draw();for(const b of U.buttons.filter(b=>b.id.startsWith('mission-answer-')))assert.ok(b.label.length>3);}
});
test('build-time mission validation includes source references and existing glyph coverage',()=>{
    const report=checkMissions(root);assert.equal(report.errors.length,0,JSON.stringify(report.errors));assert.ok(report.checks>=10);
});
