/** Build-time validation of mission references, schemas and existing GPU glyphs. */
import {readFileSync, existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {validateMission, LEVELS} from '../src/education/mission-engine.js';
import {DOMAIN, REFERENCE_SIGNAL} from '../src/models/signal.js';
export function checkMissions(root) {
    let checks=0;const errors=[];
    const verify=(label,ok)=>{checks++;if(!ok)errors.push('Missioni: '+label);};
    const json=path=>JSON.parse(readFileSync(resolve(root,path),'utf8'));
    try {
        const index=json('content/missions/index.json'),catalogue=json('content/catalogue.json');
        const glyphs=json('assets/glyphs.json').styles.body.glyphs,seen=new Set();
        verify('schema del registro',index.schemaVersion===1&&Array.isArray(index.missions));
        for(const item of index.missions||[]) {
            verify('percorso locale '+item.id,/^content\/missions\/[a-z0-9-]+\.json$/.test(item.path));
            if(!/^content\/missions\/[a-z0-9-]+\.json$/.test(item.path))continue;
            verify('ID unico '+item.id,!seen.has(item.id));seen.add(item.id);
            const d=validateMission(json(item.path));verify('identità '+item.id,d.id===item.id&&d.unitId===item.unitId);
            verify('unità '+item.unitId,catalogue.modules.some(m=>m.id===item.unitId));
            for(const id of d.prerequisites)verify('prerequisito '+id,catalogue.modules.some(m=>m.id===id));
            for(const ref of d.references)verify('fonte '+ref.path,typeof ref.path==='string'&&!ref.path.includes('..')&&existsSync(resolve(root,ref.path)));
            verify('dominio del modello',JSON.stringify(d.experiment.domain)===JSON.stringify(DOMAIN));
            verify('legge di riferimento',JSON.stringify(d.experiment.reference)===JSON.stringify(REFERENCE_SIGNAL));
            const texts=[d.title,d.description,...d.steps.flatMap(s=>[s.title,s.label,...LEVELS.flatMap(l=>s.text[l])]),...d.questions.flatMap(q=>[q.prompt,...q.options.flatMap(o=>[o.text,o.feedback])])];
            const missing=[...new Set(texts.join('').split('').filter(c=>!Object.hasOwn(glyphs,c)))];
            verify('glifi tipografici mancanti '+JSON.stringify(missing),missing.length===0);
            verify('nessuna immagine nella missione',!/<img|data:image|\.(?:png|webp|jpe?g)\b/i.test(JSON.stringify(d)));
        }
    }catch(error){verify(error.message,false);}
    return {checks,passed:checks-errors.length,errors};
}
