import test from 'node:test';
import assert from 'node:assert/strict';
import {fresh,cleanState,openStore} from '../src/store.js';
import {normalize,cleanAtlas,searchModules,unitStatus,rememberVisit,contains,placeLabels,edgeIndicator,routeSystems,galaxyCamera,atlasLayout} from '../src/navigation/atlas-model.js';
import {hexGeometry,billboard,routeGeometry} from '../src/navigation/atlas-scene.js';
import {project,mul,perspective,lookAt} from '../src/renderer.js';
import {fixture,layoutErrors,catalogue,bundle} from '../tools/atlas-fixture.mjs';

test('Atlas search: normalized accents, topic, discipline, thematic area and path restriction',()=>{
 assert.equal(normalize('  Géométria  '),'geometria');
 assert.ok(searchModules(catalogue.modules,'DNA').length>0);
 const algebra=searchModules(catalogue.modules,'algebra ed equazioni').map(m=>m.id);for(const id of ['math-c02','math-c03','math-c04','math-c05','math-a','math-p03'])assert.ok(algebra.includes(id),id);
 assert.equal(searchModules(catalogue.modules,'VSEPR',2)[0].id,'chemistry-08');assert.equal(searchModules(catalogue.modules,'echo 08').length,0);
 assert.ok(searchModules(catalogue.modules,'energia',1).every(m=>m.sector===1));
 assert.deepEqual(searchModules(catalogue.modules,'inesistentezz'),[]);
 assert.ok(searchModules(catalogue.modules,'',-1,bundle.paths[0]).every(m=>bundle.paths[0].units.includes(m.id)));
});
test('Atlas storage: validation, independent state, import/export and unsupported keys',()=>{
 const a=fresh(),b=fresh();a.atlas.visited.push(2);assert.equal(b.atlas.visited.length,0);
 assert.deepEqual(cleanAtlas({version:1,visited:[2,3]}).visited,[]);
 const cleaned=cleanAtlas({version:2,textScale:9,visited:[-1,2,2,99,'3'],recent:['__proto__','math-c08','math-c08'],contrast:'yes'});
 assert.deepEqual(cleaned.visited,[2]);assert.deepEqual(cleaned.recent,['math-c08']);assert.equal(cleaned.textScale,1);assert.equal(cleaned.contrast,false);
 a.atlas.textScale=1.4;a.atlas.contrast=true;assert.deepEqual(cleanState(JSON.parse(JSON.stringify(a))).atlas,a.atlas);
 const map=new Map(),storage={getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v)};const s=openStore(storage);s.data.atlas=a.atlas;s.save();assert.deepEqual(openStore(storage).data.atlas,a.atlas);
});
test('Atlas history: visit is not progress or certification; snapshots remain distinct',()=>{
 const data=fresh(),m=catalogue.modules[7];assert.equal(unitStatus(m,data).code,'new');rememberVisit(data,m,true);assert.equal(unitStatus(m,data).code,'visited');assert.equal(Object.keys(data.courses).length,0);
 data.courses[m.id]={stage:1};assert.equal(unitStatus(m,data).code,'started');data.courses[m.id].snapshots={A:{}};assert.equal(unitStatus(m,data).code,'experiment');
 data.courses[m.id].completedAt='2026-11-15';assert.equal(unitStatus(m,data).code,'experiment');data.courses[m.id].completionSignature='verified';assert.equal(unitStatus(m,data).code,'complete');
 rememberVisit(data,m,true);assert.deepEqual(data.atlas.visited,[2]);assert.deepEqual(data.atlas.recent,[m.id]);
});
test('Atlas markers: closed hexagon mesh, finite coordinates and valid indices',()=>{
 const m=hexGeometry();assert.ok(m.v.length>0&&m.i.length>0);assert.ok(m.v.every(Number.isFinite));assert.ok(m.i.every(i=>i<m.v.length/12));
 const b=billboard([1,2,3],[0,10,20],[0,0,0],.5);assert.deepEqual(Array.from(b.slice(12,15)),[1,2,3]);assert.ok([...b].every(Number.isFinite));
});
test('Atlas labels avoid collisions and do not displace stars',()=>{
 const points=[{x:100,y:100,index:0,depth:1},{x:110,y:100,index:1,depth:2},{x:200,y:200,index:2,depth:-1}],copy=structuredClone(points),bounds={x:0,y:0,w:300,h:250};
 const labels=placeLabels(points,bounds,1,()=>60,22);assert.deepEqual(points,copy);assert.ok(labels.every(p=>contains(bounds,p.x,p.y)&&contains(bounds,p.x+p.w,p.y+p.h)));assert.ok(!labels.some(l=>l.index===2));
});
test('Atlas compass: outside and behind-camera targets yield bounded directions',()=>{
 const r={x:10,y:20,w:300,h:200};assert.equal(edgeIndicator({x:100,y:100,depth:1},r),null);
 for(const p of [{x:1000,y:100,depth:1},{x:100,y:-1000,depth:1},{x:500,y:500,depth:-2}]){const e=edgeIndicator(p,r);assert.ok(contains(r,e.x,e.y));assert.ok(Number.isFinite(e.angle));}
});
test('Atlas camera centers actual targets within the usable viewport',()=>{
 for(const [w,h]of[[1280,900],[390,844],[844,390]]){const map=atlasLayout(w,h).map,state={distance:60,yaw:.3,pitch:.45,atlasViewport:map,atlasTarget:[15,1,-4]},c=galaxyCamera(state,w,h),vp=mul(perspective(.84,w/h,.00004,400),lookAt(c.eye,c.target)),p=project(state.atlasTarget,vp,w,h);assert.ok(Math.abs(p[0]-map.x-map.w/2)<.001);assert.ok(Math.abs(p[1]-map.y-map.h/2)<.001);}
});
test('Atlas routes: use curriculum IDs, never manufacture star positions',()=>{
 const path={units:['math-c08','physics-08','biology-25']};assert.deepEqual(routeSystems(path,catalogue.modules),[2,7,24]);const f=fixture();const before=f.world.systems.map(s=>[...s.position]);const mesh=routeGeometry([2,7,24],f.world.systems);assert.ok(mesh.v.every(Number.isFinite));assert.deepEqual(f.world.systems.map(s=>s.position),before);
});
test('Atlas UI: modules, search, preview levels, paths and history are connected',()=>{
 const f=fixture();f.click('atlas-list');f.A.query='VSEPR';f.draw();assert.equal(f.A.results[0].id,'chemistry-08');f.click('atlas-result-chemistry-08');assert.equal(f.state.system,13);assert.equal(f.state.selected,57);assert.equal(f.state.scene,'galaxy');
 f.draw();assert.ok(f.U.buttons.some(b=>b.id==='atlas-unit-chemistry-08'&&b.active!==false));f.A.open('detail');f.draw();f.click('atlas-level-2');assert.equal(f.A.level,2);assert.ok(f.A.semanticText().includes('Geometria'));f.click('atlas-learn');assert.equal(f.state.scene,'mission');assert.equal(f.store.data.atlas.lastUnit,'chemistry-08');
 f.state.scene='galaxy';f.A.open('routes');f.click('atlas-path-'+bundle.paths[0].id);assert.equal(f.A.pathId,bundle.paths[0].id);assert.equal(f.state.scene,'galaxy');
 f.A.open('history');f.draw();assert.ok(f.U.buttons.some(b=>b.id==='atlas-resume-chemistry-08'));
});
test('Atlas: reduced movement makes centering immediate, drag cancels flight',()=>{
 const f=fixture();f.state.paused=true;f.A.focusSystem(5);assert.equal(f.A.flight,null);assert.deepEqual(f.state.atlasTarget,f.world.systems[5].position);
 f.state.paused=false;f.A.focusSystem(9);assert.ok(f.A.flight);f.A.cancelFlight();assert.equal(f.A.flight,null);
});
test('Atlas: all targets 44px, no overlaps, all sheet layouts at three text scales',()=>{
 let checks=0;for(const [w,h]of[[320,568],[360,640],[390,844],[430,932],[844,390],[800,600],[1280,900],[1600,1000]])for(const scale of[1,1.2,1.4])for(const sheet of[null,'list','detail','routes','history','guide','access','welcome']){
  const f=fixture(w,h,{scale});f.A.sheet=sheet;if(sheet==='history')rememberVisit(f.store.data,catalogue.modules[7],true);f.draw();assert.deepEqual(layoutErrors(f),[],`${w}x${h} ${scale} ${sheet}`);assert.ok(f.R.uiData.every(Number.isFinite));checks++;
 }assert.equal(checks,192);
});
test('Atlas rendering keeps mesh counts bounded across frames and camera changes',()=>{
 const f=fixture();f.draw();const made=f.R.made;for(let i=0;i<12;i++){f.state.yaw+=.05;f.draw();}assert.equal(f.R.made,made);assert.ok(f.R.frameStats.atlasMarkers>0);
 f.A.pathId=bundle.paths[0].id;f.draw();const next=f.R.made;f.draw();assert.equal(f.R.made,next);f.A.pathId=null;f.draw();assert.ok(!f.R.meshes.has('atlas-route'));
});
