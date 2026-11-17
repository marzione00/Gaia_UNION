/** Pure, deterministic teaching models. No network, dynamic evaluation or render state.
 * Inputs/outputs use the units in each descriptor. A null output is a domain gap.
 * These are declared idealisations, not measurements of the fictional planets. */
const pi=Math.PI, R=8.31446261815324;
export const MODEL_VERSION='1.0.0';
const models={};
const control=(key,label,unit,min,max,step,value)=>({key,label,unit,min,max,step,value});
const A=(label,unit,min,max,step,value)=>control('a',label,unit,min,max,step,value);
const B=(label,unit,min,max,step,value)=>control('b',label,unit,min,max,step,value);
function add(id,formula,xLabel,xUnit,yLabel,yUnit,domain,controls,fn,fixture,options={}){
 models[id]=Object.freeze({id,formula,xLabel,xUnit,yLabel,yUnit,domain,controls,fn,fixture,kind:'curve',discrete:false,...options});
}
const choose=(n,k)=>{if(!Number.isInteger(k)||k<0||k>n)return 0;let v=1;for(let i=1;i<=k;i++)v=v*(n-i+1)/i;return v;};
const entropy=(p,base=2)=>p<=0||p>=1?0:-(p*Math.log(p)+(1-p)*Math.log1p(-p))/Math.log(base);
const iterate=(n,initial,fn)=>{let v=initial;for(let i=0;i<n;i++)v=fn(v);return v;};
// Mathematics: the original 25 identifiers and titles are retained in the catalogue.
add('math-c01','y = x(1+a/100)','Valore iniziale','u.a.','Valore finale','u.a.',[0,100],[A('Variazione','%',-50,100,5,20)],(x,p)=>x*(1+p.a/100),[50,60]);
add('math-c02','y = (x-a)(x+a) = x²-a²','x','1','Polinomio','1',[-6,6],[A('Radice a','1',0,5,.5,2)],(x,p)=>x*x-p.a*p.a,[3,5]);
add('math-c03','y = √(x-a)','x','1','Radice','1',[-4,10],[A('Soglia a','1',-3,6,1,1)],(x,p)=>x>=p.a?Math.sqrt(x-p.a):null,[5,2]);
add('math-c04','r(x) = ax+b - (-x+4)','x','1','Residuo','1',[-5,5],[A('Pendenza a','1',-2,3,.5,1),B('Intercetta b','1',-2,4,1,0)],(x,p)=>(p.a+1)*x+p.b-4,[2,0]);
add('math-c05','m(x) = ax+b; ammissibile se m ≥ 0','x','1','Margine','1',[-6,6],[A('Coefficiente a','1',-3,3,.5,1),B('Termine b','1',-4,4,1,-2)],(x,p)=>p.a*x+p.b,[3,1]);
add('math-c06','y = a exp(bx)','Tempo','u.t.','Quantità','u.a.',[0,10],[A('Valore iniziale','u.a.',1,10,1,2),B('Tasso b','1/u.t.',-.5,.5,.05,.2)],(x,p)=>p.a*Math.exp(p.b*x),[0,2]);
add('math-c07','d = √((x-a)²+b²)','Ascissa','u.l.','Distanza','u.l.',[-5,5],[A('Ascissa punto','u.l.',-3,3,1,0),B('Ordinata punto','u.l.',0,5,.5,3)],(x,p)=>Math.hypot(x-p.a,p.b),[4,5],{kind:'vector'});
add('math-c08','y = a(x-b)²','x','1','f(x)','1',[-4,6],[A('Coefficiente a','1',-2,2,.25,1),B('Ascissa vertice','1',-2,4,.5,2)],(x,p)=>p.a*(x-p.b)**2,[4,4]);
add('math-c09','y = a sin(x+b)','Angolo','rad','Ordinata','u.l.',[0,2*pi],[A('Ampiezza','u.l.',.5,3,.5,1),B('Fase','rad',0,pi,pi/8,0)],(x,p)=>p.a*Math.sin(x+p.b),[pi/2,1],{kind:'phasor'});
add('math-c10','P(k) = C(n,k) p^k (1-p)^(n-k)','Successi k','1','Probabilità','1',[0,10],[A('Prove n','1',1,10,1,4),B('Probabilità p','1',0,1,.1,.5)],(x,p)=>x>p.a?0:choose(p.a,x)*p.b**x*(1-p.b)**(p.a-x),[2,.375],{discrete:true,kind:'bars'});
add('math-c11','Area = base × altezza / 2','Base','u.l.','Area','u.l.²',[0,10],[A('Altezza','u.l.',1,8,1,4)],(x,p)=>x*p.a/2,[3,6],{kind:'triangle'});
add('math-a','P(x) = (x-a)²(x+2)','x','1','P(x)','1',[-4,4],[A('Radice doppia','1',-1,3,.5,1)],(x,p)=>(x-p.a)**2*(x+2),[1,0]);
add('math-b','Ampiezza(n) = a / 2^n','Iterazioni n','1','Ampiezza intervallo','1',[0,20],[A('Ampiezza iniziale','1',1,8,1,2)],(x,p)=>p.a/2**x,[3,.25],{discrete:true});
add('math-p01','S_n = a(1-b^(n+1))/(1-b)','Indice n','1','Somma parziale','1',[0,20],[A('Primo termine','1',1,4,1,1),B('Ragione','1',0,1,.1,.5)],(x,p)=>p.b===1?p.a*(x+1):p.a*(1-p.b**(x+1))/(1-p.b),[2,1.75],{discrete:true});
add('math-p02','||v_n|| = √(a^(2n)+b^(2n))','Iterazioni n','1','Norma vettore','1',[0,10],[A('Autovalore a','1',0,2,.1,.8),B('Autovalore b','1',0,2,.1,.6)],(x,p)=>Math.hypot(p.a**x,p.b**x),[1,1],{discrete:true,kind:'vector'});
add('math-p03','Re(z^n) = a^n cos(nb)','Potenza n','1','Parte reale','1',[0,12],[A('Modulo a','1',.5,1.5,.1,1),B('Argomento b','rad',0,pi,pi/6,pi/3)],(x,p)=>p.a**x*Math.cos(x*p.b),[3,-1],{discrete:true,kind:'phasor'});
add('math-p04','A(x) = ∫₀ˣ a t² dt = ax³/3','Estremo x','1','Integrale','1',[0,5],[A('Coefficiente a','1',.5,3,.5,1)],(x,p)=>p.a*x**3/3,[3,9]);
add('math-p05','z_(n+1) = (z_n+a/z_n)/2','Iterazioni n','1','Approssimazione','1',[0,10],[A('Radicando a','1',1,9,1,2),B('Iniziale z₀','1',.5,4,.5,1)],(x,p)=>iterate(x,p.b,z=>(z+p.a/z)/2),[1,1.5],{discrete:true});
add('math-p06','x′ = a cos(θ) - b sin(θ)','Rotazione θ','rad','Ascissa ruotata','u.l.',[0,2*pi],[A('Ascissa iniziale','u.l.',-3,3,1,1),B('Ordinata iniziale','u.l.',-3,3,1,0)],(x,p)=>p.a*Math.cos(x)-p.b*Math.sin(x),[pi/2,0],{kind:'rotation'});
add('math-p07','H(p) = -p log_a(p) -(1-p) log_a(1-p)','Probabilità p','1','Entropia','unità log_a',[0,1],[A('Base logaritmo','1',2,10,1,2)],(x,p)=>entropy(x,p.a),[.5,1]);
add('math-p08','x_(n+1) = a x_n (1-x_n)','Iterazioni n','1','Stato x_n','1',[0,80],[A('Parametro a','1',0,4,.1,3.2),B('Stato iniziale','1',.01,.99,.01,.2)],(x,p)=>iterate(x,p.b,z=>p.a*z*(1-z)),[1,.512],{discrete:true});
add('math-p09','y = sin(x)+a sin(3x)/3+b sin(5x)/5','Fase x','rad','Somma armoniche','u.a.',[0,2*pi],[A('Terza armonica','1',0,1,.25,1),B('Quinta armonica','1',0,1,.25,1)],(x,p)=>Math.sin(x)+p.a*Math.sin(3*x)/3+p.b*Math.sin(5*x)/5,[pi/2,13/15],{kind:'wave'});
add('math-p10','R_eq = x a / (x+a)','Resistenza R₁','Ω','Resistenza equivalente','Ω',[.1,10],[A('Resistenza R₂','Ω',1,10,1,4)],(x,p)=>x*p.a/(x+p.a),[4,2]);
add('math-p11','T = b+(80-b) exp(-a t)','Tempo t','min','Temperatura','°C',[0,20],[A('Tasso a','1/min',.05,.5,.05,.2),B('Ambiente b','°C',0,40,5,20)],(x,p)=>p.b+(80-p.b)*Math.exp(-p.a*x),[0,80]);
add('math-p12','E_n = a(n+1/2)','Livello n','1','Energia','u.E.',[0,10],[A('Intervallo a','u.E.',.5,3,.5,1)],(x,p)=>p.a*(x+.5),[0,.5],{discrete:true,kind:'levels'});
// Physics: idealised experiments with declared units.
add('physics-01','σ_media = a / √n','Ripetizioni n','1','Errore standard','mm',[1,100],[A('Deviazione σ','mm',.5,5,.5,2)],(x,p)=>p.a/Math.sqrt(x),[4,1],{discrete:true});
add('physics-02','|v| = √(v_x²+v_y²)','Componente v_x','m/s','Modulo velocità','m/s',[0,10],[A('Componente v_y','m/s',0,8,1,3)],(x,p)=>Math.hypot(x,p.a),[4,5],{kind:'vector'});
add('physics-03','s(t) = at+b','Tempo','s','Posizione','m',[0,10],[A('Velocità','m/s',-3,5,.5,2),B('Posizione iniziale','m',-5,5,1,1)],(x,p)=>p.a*x+p.b,[3,7]);
add('physics-04','s(t) = bt+at²/2','Tempo','s','Spostamento','m',[0,10],[A('Accelerazione','m/s²',-2,3,.5,1),B('Velocità iniziale','m/s',0,5,1,0)],(x,p)=>p.b*x+.5*p.a*x*x,[2,2]);
add('physics-05','y = x tan(θ)-g x²/(2v₀² cos²θ)','Distanza orizzontale','m','Quota','m',[0,40],[A('Angolo θ','°',15,75,5,45),B('Velocità iniziale','m/s',10,30,2,20)],(x,p)=>{let y=x*Math.tan(p.a*pi/180)-9.81*x*x/(2*p.b*p.b*Math.cos(p.a*pi/180)**2);return y>=-1e-10?Math.max(0,y):null;},[10,7.5475]);
add('physics-06','a = F/m','Forza risultante','N','Accelerazione','m/s²',[0,20],[A('Massa','kg',1,10,1,2)],(x,p)=>x/p.a,[10,5],{kind:'vector'});
add('physics-07','F_s,max = μ_s N','Forza normale','N','Attrito statico massimo','N',[0,100],[A('Coefficiente μ_s','1',0,1,.1,.3)],(x,p)=>p.a*x,[20,6]);
add('physics-08','K = mv²/2','Velocità','m/s','Energia cinetica','J',[0,10],[A('Massa','kg',1,10,1,2)],(x,p)=>.5*p.a*x*x,[3,9]);
add('physics-09','p = mv','Velocità orientata','m/s','Quantità di moto','kg m/s',[-5,5],[A('Massa','kg',1,10,1,2)],(x,p)=>p.a*x,[-3,-6],{kind:'vector'});
add('physics-10','I = mr²','Distanza asse','m','Momento di inerzia','kg m²',[.1,4],[A('Massa puntiforme','kg',1,8,1,2)],(x,p)=>p.a*x*x,[2,8],{kind:'orbit'});
add('physics-11','τ = rF sin(θ)','Angolo','rad','Momento torcente','N m',[0,pi],[A('Forza','N',1,20,1,10),B('Braccio r','m',.5,4,.5,2)],(x,p)=>p.a*p.b*Math.sin(x),[pi/2,20],{kind:'rotation'});
add('physics-12','g(r) = μ/r²','Distanza dal centro','m','Campo gravitazionale','m/s²',[.5,5],[A('Parametro μ = GM','m³/s²',1,20,1,10)],(x,p)=>p.a/(x*x),[2,2.5],{kind:'orbit'});
add('physics-13','v_c = √(μ/r)','Raggio orbitale','m','Velocità circolare','m/s',[1,20],[A('Parametro μ = GM','m³/s²',20,200,20,100)],(x,p)=>Math.sqrt(p.a/x),[4,5],{kind:'orbit'});
add('physics-14','Δp = ρ g h','Profondità','m','Pressione relativa','Pa',[0,10],[A('Densità fluido','kg/m³',500,1500,100,1000)],(x,p)=>p.a*9.81*x,[2,19620]);
add('physics-15','F_A = ρ g V','Volume immerso','m³','Spinta di Archimede','N',[0,.02],[A('Densità fluido','kg/m³',500,1500,100,1000)],(x,p)=>p.a*9.81*x,[.001,9.81],{kind:'cell'});
add('physics-16','x(t) = A cos(ωt)','Tempo','s','Spostamento','m',[0,10],[A('Ampiezza A','m',.5,3,.5,1),B('Pulsazione ω','rad/s',.5,4,.5,2)],(x,p)=>p.a*Math.cos(p.b*x),[0,1],{kind:'wave'});
add('physics-17','y(x) = A sin(2πx/λ), t=0','Posizione','m','Spostamento','m',[0,10],[A('Ampiezza A','m',.5,3,.5,1),B('Lunghezza λ','m',1,8,1,4)],(x,p)=>p.a*Math.sin(2*pi*x/p.b),[1,1],{kind:'wave'});
add('physics-18','p = nRT/V','Volume','L','Pressione','Pa',[1,10],[A('Quantità n','mol',.5,3,.5,1),B('Temperatura T','K',200,500,25,300)],(x,p)=>p.a*R*p.b/(x/1000),[5,498867.7570891944]);
add('physics-19','Q = mc ΔT','Variazione termica','K','Calore assorbito','J',[0,50],[A('Massa','kg',.1,2,.1,.2),B('Calore specifico','J/(kg K)',500,4500,100,4184)],(x,p)=>p.a*p.b*x,[10,8368]);
add('physics-20','η_C = 1-T_f/T_c','Sorgente calda T_c','K','Rendimento limite','1',[400,1000],[A('Sorgente fredda','K',100,350,25,300)],(x,p)=>1-p.a/x,[600,.5]);
add('physics-21','E = k q/r²','Distanza','m','Campo elettrico','N/C',[.1,3],[A('Carica sorgente','nC',1,10,1,1)],(x,p)=>8.9875517923*p.a/(x*x),[1,8.9875517923],{kind:'orbit'});
add('physics-22','U = qV','Carica','μC','Energia potenziale','μJ',[0,10],[A('Potenziale V','V',-200,200,25,100)],(x,p)=>p.a*x,[2,200]);
add('physics-23','I = V/R','Tensione','V','Corrente','A',[0,24],[A('Resistenza R','Ω',1,20,1,10)],(x,p)=>x/p.a,[12,1.2]);
add('physics-24','ε(t) = -Φ₀ω cos(ωt)','Tempo','s','Forza elettromotrice','V',[0,10],[A('Ampiezza flusso Φ₀','Wb',.05,.5,.05,.1),B('Pulsazione ω','rad/s',.5,4,.5,2)],(x,p)=>-p.a*p.b*Math.cos(p.b*x),[0,-.2],{kind:'wave'});
add('physics-25','E_tot = n hc/λ; hc ≈ 1239,842 eV nm','Lunghezza d’onda','nm','Energia n fotoni','eV',[200,1000],[A('Numero fotoni n','1',1,5,1,1)],(x,p)=>p.a*1239.841984/x,[500,2.479683968],{kind:'wave'});
// Chemistry. Concentrations use ideal activities unless explicitly noted.
add('chemistry-01','ρ = m/V','Volume','cm³','Densità','g/cm³',[1,10],[A('Massa','g',1,30,1,10)],(x,p)=>p.a/x,[2,5]);
add('chemistry-02','m_media = x m₁+(1-x)m₂','Frazione isotopo 1','1','Massa media','u',[0,1],[A('Massa isotopo 1','u',8,12,1,10),B('Massa isotopo 2','u',13,16,1,14)],(x,p)=>x*p.a+(1-x)*p.b,[.25,13],{kind:'atoms'});
add('chemistry-03','n = m/M','Massa','g','Quantità di sostanza','mol',[0,100],[A('Massa molare','g/mol',10,100,2,18)],(x,p)=>x/p.a,[36,2],{kind:'atoms'});
add('chemistry-04','ΔE = 13,6 Z²(1-1/n²)','Livello iniziale n','1','Energia emessa','eV',[2,6],[A('Numero atomico Z','1',1,3,1,1)],(x,p)=>13.6*p.a*p.a*(1-1/(x*x)),[2,10.2],{discrete:true,kind:'levels'});
add('chemistry-05','r = 52,9 n²/Z_eff','Carica efficace','1','Raggio del modello','pm',[1,10],[A('Livello n','1',1,4,1,1)],(x,p)=>52.9*p.a*p.a/x,[2,26.45],{kind:'atoms'});
add('chemistry-06','U = -138,935456 |z₁z₂| / r','Distanza ionica','nm','Energia molare','kJ/mol',[.2,2],[A('Prodotto |z₁z₂|','1',1,4,1,1)],(x,p)=>-138.935456*p.a/x,[1,-138.935456],{kind:'bond'});
add('chemistry-07','U = D(1-exp(-b(r/r₀-1)))²-D','Distanza r/r₀','1','Potenziale di Morse','kJ/mol',[.4,3],[A('Profondità D','kJ/mol',50,200,25,100),B('Larghezza b','1',1,3,.5,2)],(x,p)=>p.a*(1-Math.exp(-p.b*(x-1)))**2-p.a,[1,-100],{kind:'bond'});
add('chemistry-08','d = √(2 l²(1-cos θ))','Angolo θ','°','Distanza terminali','Å',[0,180],[A('Lunghezza legame l','Å',.5,2,.1,1)],(x,p)=>Math.sqrt(Math.max(0,2*p.a*p.a*(1-Math.cos(x*pi/180)))),[60,1],{kind:'molecule'});
add('chemistry-09','U = 4ε[(σ/r)^12-(σ/r)^6]','Distanza','u.l.','Potenziale LJ','u.E.',[.8,3],[A('Profondità ε','u.E.',.5,3,.5,1),B('Lunghezza σ','u.l.',.5,1.2,.1,1)],(x,p)=>4*p.a*((p.b/x)**12-(p.b/x)**6),[1,0],{kind:'bond'});
add('chemistry-10','V = nRT/p; p=1 atm','Temperatura','K','Volume ideale','L',[200,600],[A('Quantità n','mol',.5,3,.5,1)],(x,p)=>p.a*.082057366*x,[300,24.6172098]);
add('chemistry-11','Q = mL','Massa','kg','Calore di transizione','kJ',[0,2],[A('Calore latente L','kJ/kg',100,500,10,334)],(x,p)=>p.a*x,[.5,167]);
add('chemistry-12','C_f = C_i V_i/V_f','Volume finale','L','Concentrazione finale','mol/L',[.1,2],[A('Concentrazione iniziale','mol/L',.5,3,.5,1),B('Volume iniziale','L',.05,.2,.05,.1)],(x,p)=>x>=p.b?p.a*p.b/x:null,[.5,.2]);
add('chemistry-13','s(s+c)=K_sp; asse x = log₁₀ K_sp','log₁₀ K_sp','1','Solubilità s','mol/L',[-12,-2],[A('Ione comune c','mol/L',0,.01,.001,0)],(x,p)=>{const k=10**x;return 2*k/(Math.sqrt(p.a*p.a+4*k)+p.a);},[-8,.0001]);
add('chemistry-14','2 H₂ + O₂ → 2 H₂O; n_acqua = min(n_H₂, 2n_O₂)','Idrogeno iniziale','mol','Acqua teorica','mol',[0,10],[A('Ossigeno iniziale','mol',.5,4,.5,2)],(x,p)=>Math.min(x,2*p.a),[6,4],{kind:'molecule'});
add('chemistry-15','m_reale = resa × m_teorica / 100','Massa teorica','g','Massa ottenuta','g',[0,100],[A('Resa','%',10,100,5,75)],(x,p)=>p.a*x/100,[40,30]);
add('chemistry-16','q_reazione = -m c ΔT; c=4,184 J/(g K)','Aumento temperatura','K','Calore reazione','kJ',[0,20],[A('Massa soluzione','g',50,500,50,100)],(x,p)=>-p.a*4.184*x/1000,[10,-4.184]);
add('chemistry-17','[A](t) = [A]₀ exp(-kt)','Tempo','min','Concentrazione reagente','mol/L',[0,20],[A('Concentrazione iniziale','mol/L',.5,3,.5,1),B('Costante k','1/min',.05,.5,.05,.2)],(x,p)=>p.a*Math.exp(-p.b*x),[0,1]);
add('chemistry-18','k(T) = A exp(-E_a/(RT))','Temperatura','K','Costante cinetica','1/s',[250,800],[A('Fattore A','1/s',1e5,2e6,1e5,1e6),B('Energia attivazione','kJ/mol',20,80,5,50)],(x,p)=>p.a*Math.exp(-p.b*1000/(R*x)),[500,5.979129887968594]);
add('chemistry-19','[B]_eq = C_tot K/(1+K)','Costante K','1','Concentrazione B','mol/L',[.01,10],[A('Concentrazione totale','mol/L',.5,3,.5,1)],(x,p)=>p.a*x/(1+x),[1,.5]);
add('chemistry-20','K(T) = K₀ exp[-ΔH/R(1/T-1/T₀)]','Temperatura','K','Costante K','1',[273,500],[A('K₀ a 298,15 K','1',.5,3,.5,1),B('Entalpia ΔH','kJ/mol',-40,40,10,20)],(x,p)=>p.a*Math.exp(-p.b*1000/R*(1/x-1/298.15)),[298.15,1]);
add('chemistry-21','[H⁺]=(C+√(C²+4K_w))/2; pH=-log₁₀[H⁺]','-log₁₀ C','1','pH ideale','1',[1,9],[A('pK_w','1',12,16,1,14)],(x,p)=>-Math.log10((10**(-x)+Math.sqrt(10**(-2*x)+4*10**(-p.a)))/2),[3,2.999999995657055]);
add('chemistry-22','pH = pK_a + log₁₀([A⁻]/[HA])','Rapporto base/acido','1','pH del tampone','1',[.1,10],[A('pK_a','1',3,7,.2,4.8)],(x,p)=>p.a+Math.log10(x),[1,4.8]);
add('chemistry-23','E = E° - (0,05915935/n) log₁₀ Q','Quoziente Q','1','Potenziale a 298,15 K','V',[.01,10],[A('Potenziale standard','V',-.5,2,.1,1),B('Elettroni n','1',1,4,1,2)],(x,p)=>p.a-.05915935/p.b*Math.log10(x),[1,1]);
add('chemistry-24','C_nH_(2n+2): O₂ richiesto = m(3n+1)/2','Atomi C per molecola','1','Ossigeno richiesto','mol',[1,12],[A('Alcano m','mol',.5,3,.5,1)],(x,p)=>p.a*(3*x+1)/2,[2,3.5],{discrete:true,kind:'chain'});
add('chemistry-25','M_catena ≈ n M_unità','Grado polimerizzazione','1','Massa molare catena','g/mol',[1,100],[A('Massa unità ripetitiva','g/mol',10,100,2,28)],(x,p)=>p.a*x,[10,280],{discrete:true,kind:'chain'});
// Biology: analytical teaching models, not clinical or ecological forecasts.
add('biology-01','T_eb = 1/(1/373,15 - R ln(p/101,325)/ΔH) - 273,15','Pressione p','kPa','Temperatura di ebollizione','°C',[1,1000],[A('Entalpia di vaporizzazione','kJ/mol',38,44,.1,40.7)],(x,p)=>1/(1/373.15-R*Math.log(x/101.325)/(p.a*1000))-273.15,[101.325,1/(1/373.15)-273.15],{kind:'planet'});
add('biology-02','S/V = 6/d; d = a × fattore','Fattore scala','1','Superficie/volume','1/μm',[.5,10],[A('Diametro riferimento','μm',1,20,1,10)],(x,p)=>6/(p.a*x),[2,.3],{kind:'cell'});
add('biology-03','c_int/c_est = 1 - exp(-3Pt/r)','Tempo t','h','Frazione di equilibrio','1',[0,24],[A('Raggio r','nm',25,500,25,50),B('Permeabilità P','10⁻¹⁰ cm/s',.1,10,.1,1)],(x,p)=>-Math.expm1(-10.8*p.b*x/p.a),[1,-Math.expm1(-.216)],{kind:'cell'});
add('biology-04','k/A = exp(-E_a/(RT))','Temperatura T','K','Velocità relativa','1',[10,300],[A('Energia di attivazione','kJ/mol',0,10,.5,2)],(x,p)=>Math.exp(-p.a*1000/(R*x)),[100,Math.exp(-2000/(R*100))],{kind:'molecule'});
add('biology-05','M_org = flusso × frazione × tempo','Tempo','milioni di anni','Materia organica consegnata','10¹⁵ kg',[0,500],[A('Flusso di materia','10⁶ kg/anno',1,100,1,10),B('Frazione organica','%',.1,5,.1,2)],(x,p)=>p.a*p.b*x*1e-5,[100,.02],{kind:'planet'});
add('biology-06','ee_n = ee₀gⁿ/√(1+ee₀²(g²ⁿ-1))','Cicli n','1','Eccesso enantiomerico','%',[0,10],[A('Eccesso iniziale ee₀','%',.1,10,.1,1),B('Guadagno per ciclo g','1',1,5,.5,3)],(x,p)=>p.a/100*p.b**x/Math.sqrt(1+(p.a/100)**2*(p.b**(2*x)-1))*100,[3,.27/Math.sqrt(1+1e-4*728)*100],{discrete:true,kind:'bars'});
add('biology-07','c(t) = (P/k)(1 - exp(-kt)), k = ln2/t½','Tempo','anni','Concentrazione','μmol/L',[0,200],[A('Produzione P','μmol/(L·anno)',.1,10,.1,1),B('Tempo di dimezzamento t½','anni',1,100,1,20)],(x,p)=>p.a*p.b/Math.LN2*(-Math.expm1(-Math.LN2/p.b*x)),[50,20/Math.LN2*(-Math.expm1(-Math.LN2*2.5))],{kind:'molecule'});
add('biology-08','v = V_max [S]/(K_m+[S])','Substrato','mmol/L','Velocità iniziale','μmol/min',[0,10],[A('Velocità massima','μmol/min',5,30,5,10),B('Costante K_m','mmol/L',.5,5,.5,2)],(x,p)=>p.a*x/(p.b+x),[2,5],{kind:'molecule'});
add('biology-09','ΔG = ΔG° - 4RT ln10·log p(H₂) + RT ln10·log(p(CH₄)/p(CO₂)); ΔG° = -130,5 kJ/mol','log₁₀ p(H₂)','bar','Energia di Gibbs','kJ/mol',[-8,0],[A('log₁₀ p(CH₄)/p(CO₂)','1',-6,2,1,0)],(x,p)=>-130.52-4*R*298.15*Math.LN10*x/1000+R*298.15*Math.LN10*p.a/1000,[-4,-130.52+4*R*298.15*Math.LN10*4/1000],{kind:'molecule'});
add('biology-10','N_n = N₀ (1+f)ⁿ','Cicli di copiatura','1','Molecole di RNA','molecole',[0,12],[A('Molecole iniziali','molecole',1,5,1,1),B('Frazione copiata f','1',.1,1,.1,1)],(x,p)=>p.a*(1+p.b)**x,[3,8],{discrete:true,kind:'helix'});
add('biology-11','m(t) = α/δ (1-exp(-δt)), m(0)=0','Tempo','min','mRNA atteso','molecole',[0,20],[A('Produzione α','molecole/min',1,10,1,5),B('Degradazione δ','1/min',.1,1,.1,.2)],(x,p)=>p.a/p.b*(-Math.expm1(-p.b*x)),[0,0],{kind:'helix'});
add('biology-12','P(almeno un errore) = 1-(1-μ)^n','Siti copiati n','1','Probabilità di almeno un errore','1',[0,10000],[A('Errore per sito μ','1',.00001,.001,.00001,.0001)],(x,p)=>-Math.expm1(x*Math.log1p(-p.a)),[1,.0001],{discrete:true});
add('biology-13','p′ = p(1+s)/(1+sp)','Frequenza prima p','1','Frequenza dopo selezione','1',[0,1],[A('Vantaggio s','1',-.8,1,.1,.2)],(x,p)=>x*(1+p.a)/(1+p.a*x),[.5,6/11]);
add('biology-14','σ_p = √(p(1-p)/(2N))','Frequenza p','1','Deviazione dopo deriva','1',[0,1],[A('Dimensione diploide N','individui',10,1000,10,100)],(x,p)=>Math.sqrt(x*(1-x)/(2*p.a)),[.5,Math.sqrt(.00125)]);
add('biology-15','Differenze attese = L × 3/4(1-exp(-4d/3))','Divergenza d','sostituzioni/sito','Siti diversi attesi','siti',[0,3],[A('Lunghezza sequenza L','siti',20,1000,20,100)],(x,p)=>p.a*.75*(-Math.expm1(-4*x/3)),[0,0],{kind:'helix'});
add('biology-16','t = (t½/ln2)·ln(1 + D/P)','Rapporto figlio/padre D/P','1','Età','miliardi di anni',[0,2],[A('Tempo di dimezzamento','miliardi di anni',.1,50,.1,1.25)],(x,p)=>p.a/Math.LN2*Math.log1p(x),[1,1.25],{kind:'curve'});
add('biology-17','O₂(t) = Sτ(1 - exp(-t/τ))','Tempo','milioni di anni','Ossigeno accumulato','u.a.',[0,500],[A('Sorgente netta S','u.a./milione di anni',.1,5,.1,1),B('Tempo di permanenza τ','milioni di anni',5,200,5,50)],(x,p)=>p.a*p.b*(-Math.expm1(-x/p.b)),[100,50*(-Math.expm1(-2))],{kind:'planet'});
add('biology-18','S = 10^(-D/D₁₀)','Dose D','kGy','Frazione sopravvissuta','1',[0,30],[A('Dose decimale D₁₀','kGy',.1,15,.1,10)],(x,p)=>10**(-x/p.a),[10,.1],{kind:'population'});
add('biology-19','ATP = resa × glucosio','Glucosio utilizzato','mmol','ATP nel bilancio','mmol',[0,10],[A('Resa assunta','mol/mol',2,32,2,30)],(x,p)=>p.a*x,[2,60]);
add('biology-20','Assimilazione = A_max I/(K+I)-R_d; R_d=2','Luce I','μmol/(m² s)','Assimilazione netta','μmol/(m² s)',[0,1000],[A('Assimilazione massima','μmol/(m² s)',10,30,5,20),B('Scala luminosa K','μmol/(m² s)',100,400,50,200)],(x,p)=>p.a*x/(p.b+x)-2,[200,8]);
add('biology-21','N = K/[1+(K/10-1) exp(-rt)]','Tempo','u.t.','Popolazione','individui',[0,30],[A('Capacità K','individui',20,200,10,100),B('Tasso r','1/u.t.',.1,.6,.1,.3)],(x,p)=>p.a/(1+(p.a/10-1)*Math.exp(-p.b*x)),[0,10],{kind:'population'});
add('biology-22','d = √(L/S_eff)','Luminosità L','luminosità solari','Distanza','UA',[.01,4],[A('Flusso efficace S_eff','flussi terrestri',.3,1.2,.05,1)],(x,p)=>Math.sqrt(x/p.a),[1,1],{kind:'orbit'});
add('biology-23','T_s = T_e (1 + 3τ/4)^(1/4) - 273,15','Profondità ottica τ','1','Temperatura superficiale','°C',[0,100],[A('Temperatura di equilibrio T_e','K',150,320,1,255)],(x,p)=>p.a*(1+.75*x)**.25-273.15,[1,255*1.75**.25-273.15],{kind:'planet'});
add('biology-24','P = 365,25 √(a³/M) giorni','Semiasse maggiore a','UA','Periodo orbitale','giorni',[.01,.3],[A('Massa della stella','masse solari',.08,1,.01,.12)],(x,p)=>365.25*Math.sqrt(x**3/p.a),[.0485,365.25*Math.sqrt(.0485**3/.12)],{kind:'orbit'});
add('biology-25','T = [917L(1-A)/σ]^(1/4)-273,15','Luminosità L','1','Temperatura radiativa','°C',[.6,1.6],[A('Albedo A','1',.1,.9,.05,.5)],(x,p)=>(917*x*(1-p.a)/5.67e-8)**.25-273.15,[1,(917*.5/5.67e-8)**.25-273.15],{kind:'planet'});
add('biology-26','GEL = V/(4πR²)','Volume d\'acqua V','milioni di km³','Strato globale equivalente','m',[0,50],[A('Raggio del pianeta R','km',2000,7000,10,3389.5)],(x,p)=>x*1e15/(4*Math.PI*(p.a*1e3)**2),[20,2e16/(4*Math.PI*3389500**2)],{kind:'planet'});
add('biology-27','c(t) = c₀ exp(-t/τ)','Tempo','anni','Metano residuo','ppb',[0,2000],[A('Concentrazione iniziale c₀','ppb',.1,50,.1,10),B('Tempo di vita τ','anni',10,1000,10,300)],(x,p)=>p.a*Math.exp(-x/p.b),[300,10*Math.exp(-1)],{kind:'planet'});
add('biology-28','p = ρ g h','Profondità h','km','Pressione','MPa',[0,150],[A('Gravità g','m/s²',.1,2,.005,1.315)],(x,p)=>p.a*x,[100,131.5],{kind:'planet'});
add('biology-29','v_f = R √(8πGρ/3)','Raggio R','km','Velocità di fuga','m/s',[100,3000],[A('Densità media ρ','g/cm³',.5,4,.01,1.61)],(x,p)=>x*1e3*Math.sqrt(8*Math.PI*6.6743e-11*p.a*1e3/3),[252.1,252100*Math.sqrt(8*Math.PI*6.6743e-11*1610/3)],{kind:'planet'});
add('biology-30','H = RT/(Mg)','Temperatura T','K','Altezza di scala','km',[50,300],[A('Gravità g','m/s²',.5,25,.01,1.352),B('Massa molare M','g/mol',2,50,1,28)],(x,p)=>R*x/(p.b/1000*p.a)/1000,[94,R*94/(.028*1.352)/1000],{kind:'planet'});
add('biology-31','δ = (R_p/R_s)²','Raggio del pianeta','raggi terrestri','Profondità del transito','ppm',[.5,15],[A('Raggio della stella','raggi solari',.1,2,.01,1)],(x,p)=>(x*6371/(p.a*695700))**2*1e6,[1,(6371/695700)**2*1e6],{kind:'orbit'});
add('biology-32','ΔD = 2HR_p/R_s²','Altezza di scala H','km','Segnale atmosferico','ppm',[5,500],[A('Raggio del pianeta','raggi terrestri',.5,15,.1,1),B('Raggio della stella','raggi solari',.1,2,.01,1)],(x,p)=>2*x*p.a*6371/(p.b*695700)**2*1e6,[8.5,2*8.5*6371/695700**2*1e6],{kind:'planet'});
add('biology-33','F = c/τ','Tempo di vita τ','anni','Flusso necessario','ppm/anno',[1,100],[A('Abbondanza c','ppm',.1,10,.1,1.9)],(x,p)=>p.a/x,[10,.19],{kind:'planet'});
add('biology-34','S = 10^(-d·t/D₁₀)','Tempo nello spazio','anni','Frazione sopravvissuta','1',[0,100],[A('Dose annua d','Gy/anno',.1,100,.1,10),B('Dose decimale D₁₀','Gy',100,10000,100,1000)],(x,p)=>10**(-p.a*x/p.b),[10,10**-.1],{kind:'population'});
add('biology-35','N = (R* f_p n_e)(f_l f_i f_c) L','Durata L','anni','Civiltà comunicanti','1',[0,100000],[A('R* f_p n_e','pianeti abitabili/anno',.1,10,.1,1),B('f_l f_i f_c','1',.0001,1,.0001,.01)],(x,p)=>p.a*p.b*x,[10000,100],{kind:'curve'});
export const MODELS=Object.freeze(models);
export function descriptor(id){const m=Object.hasOwn(MODELS,id)?MODELS[id]:null;if(!m)throw new RangeError('Modello sconosciuto: '+id);return m;}
export function defaults(id){return Object.fromEntries(descriptor(id).controls.map(c=>[c.key,c.value]));}
const integerControls=new Set(['math-c10:a','biology-14:a','chemistry-04:a','chemistry-05:a','chemistry-23:b','physics-25:a','biology-10:a']);
export function validParameters(id,p){return !!p&&typeof p==='object'&&!Array.isArray(p)&&descriptor(id).controls.every(c=>typeof p[c.key]==='number'&&Number.isFinite(p[c.key])&&p[c.key]>=c.min&&p[c.key]<=c.max&&(!integerControls.has(id+':'+c.key)||Number.isInteger(p[c.key])));}

export function parameters(id,p){if(!validParameters(id,p))throw new RangeError('Parametri fuori dominio: '+id);return Object.fromEntries(descriptor(id).controls.map(c=>[c.key,p[c.key]]));}
export function parameterKey(id,p){return id+'|'+descriptor(id).controls.map(c=>`${c.key}:${p[c.key]}`).join('|');}
export function value(id,x,p=defaults(id)){
 const m=descriptor(id);parameters(id,p);
 if(!Number.isFinite(x)||x<m.domain[0]-1e-10||x>m.domain[1]+1e-10||(m.discrete&&!Number.isInteger(x)))return null;
 const y=m.fn(x,p);return typeof y==='number'&&Number.isFinite(y)?y:null;
}
export function samples(id,p=defaults(id),count=121){
 const m=descriptor(id);parameters(id,p);if(!Number.isInteger(count)||count<2||count>1001)throw new RangeError('Campioni non validi');
 if(m.discrete){const size=m.domain[1]-m.domain[0]+1;const step=Math.max(1,Math.ceil(size/count));const xs=[];for(let x=m.domain[0];x<=m.domain[1];x+=step)xs.push(x);if(xs.at(-1)!==m.domain[1])xs.push(m.domain[1]);return xs.map(x=>({x,y:value(id,x,p)}));}
 return Array.from({length:count},(_,i)=>{const x=m.domain[0]+(m.domain[1]-m.domain[0])*i/(count-1);return {x,y:value(id,x,p)};});
}
export function probePoints(id){const m=descriptor(id),a=m.domain[0],d=m.domain[1]-a;return [.25,.5].map(f=>m.discrete?Math.round(a+d*f):a+d*f);}
export function trend(id,p){const [x0,x1]=probePoints(id),y0=value(id,x0,p),y1=value(id,x1,p);if(y0===null||y1===null)return 'undefined';const scale=Math.max(Number.MIN_VALUE,...samples(id,p,17).filter(q=>q.y!==null).map(q=>Math.abs(q.y)),Math.abs(y0),Math.abs(y1)),e=1e-10*scale;return Math.abs(y1-y0)<=e?'constant':y1>y0?'increases':'decreases';}
export const MODEL_IDS=Object.freeze(Object.keys(MODELS));
