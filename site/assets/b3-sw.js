/* BaobaoBytes: Kiswahili text for the games and tools. Loaded only on Kiswahili pages, before b3.js.
   Same structure as the English text in b3.js. Each answer is [text, 1 if correct, explanation]. */
window.B3_SW={
ui:{selected:'Imechaguliwa, bonyeza nakili',copied:'Imenakiliwa ✓',copyNo:'Kunakili hakuruhusiwi hapa',copyAgree:'Nakili makubaliano',
 question:function(i,n){return 'Swali '+i+' kati ya '+n},good:'Safi sana! ✅',miss:'Bado kidogo. Sababu ni hii',best:'Hatua bora:',seeBadge:'Ona beji yangu',next:'Endelea',
 unlocked:'Umepata beji',spotted:function(s,n){return 'Umegundua hila '+s+' kati ya '+n+'. '},perfect:'Alama kamili! 🎉',sharper:'Kila jaribio linakunoa zaidi.',
 earned:'Beji umepata',again:'Cheza tena',parentsAll:'Ungeshughulikia hali zote tatu kwa utulivu. Mshirikishe mzazi mwingine.',parentsSome:'Tulia kwanza, kisha chukua hatua. Jaribu tena au soma hatua zilizo kwenye ukurasa huu.',
 kidsAll:'Umepata zote sawa. Mfundishe mtu mzima hila moja uliyogundua!',kidsSome:'Ungependa kujaribu tena? Mazoezi yanakusaidia kugundua haraka maishani.',
 tapBox:'Sasa gusa kisanduku: “Sawa kushiriki” au “Weka siri”.',tapCard:'Kwanza gusa kadi moja hapo juu.',sorted:'🎉 Umepanga zote! Unajua cha kuweka siri.',
 yes:function(x){return 'Ndiyo! Umeweka “'+x+'” mahali sahihi.'},secretWhy:function(x){return 'Hmm, fikiri tena: mgeni anaweza kutumia “'+x+'” kukupata au kuingia kwenye vitu vyako.'},
 shareWhy:function(x){return 'Hmm, fikiri tena: ni sawa kushiriki “'+x+'”. Kitu hiki hakionyeshi mahali ulipo.'},
 tickPromises:'Chagua ahadi chache ili kujenga makubaliano yenu.',agreeTitle:'Makubaliano ya familia yetu mtandaoni'},

badge:{home:['🌳','Mvumbuzi'],chipukizi:['🌱','Salama Mtandaoni'],wabunifu:['🎨','Mbunifu'],walinzi:['🛡️','Mlinzi'],parents:['🤝','Mwongozi Mtulivu']},

lines:{chipukizi:'Tucheze, na tubaki salama!',wabunifu:'Iunde. Ikague. Imiliki.',walinzi:'Linda. Jenga. Onyesha kazi yako.',parents:'Usalama mtandaoni wa mtoto wako, kwa utulivu na vitendo.'},
lede:{
 chipukizi:['Michezo na hadithi kwa watoto wa miaka 9–11 ili kugundua hila, kutunza siri na kujua nani wa kumwambia.','chipukizi.html','Gundua Chipukizi'],
 wabunifu:['Kwa wabunifu wa miaka 12–14: kagua kabla ya kuchapisha, gundua bandia na linda kazi yako.','wabunifu.html','Gundua Wabunifu'],
 walinzi:['Kwa miaka 15–18: funga akaunti zako, shinda utapeli wa Kenya na tumia AI kwa busara.','walinzi.html','Gundua Walinzi'],
 parents:['Msaada kwa lugha rahisi kwa wazazi na walezi, ili umsaidie mtoto wako bila hofu.','wazazi.html','Gundua Wazazi']},

sorter:[['Rangi unayoipenda','share'],['Nenosiri lako','secret'],['Jina la shule yako','secret'],['Mnyama unayempenda','share'],['Anwani ya nyumbani kwenu','secret'],['Mchoro (bila uso, bila jina)','share'],['Namba yako ya simu','secret'],['Mchezo unaoupenda zaidi','share']],

pw:{A:['Embe','Simba','Twiga','Pilipili','Roketi','Ndizi','Ndovu','Chapati','Kifaru','Mandazi','Radi','Pundamilia','Nanasi','Mbuyu','Kobe','Tausi'],
 B:['Anacheza','Anaimba','Anaruka','Analala','Anacheka','Anachora','Anapaa','Anaogelea','Anaoka','AnapigaNgoma'],
 C:['Mwezini','HukoMombasa','UsikuWaManane','NaSoksi','ChiniYaKitanda','NdaniYaBasi','Mvuani','KandoYaZiwa']},

Q:{
 chipukizi:[
  {app:['⭐','Star_Gamer','Kwenye gumzo la mchezo'],kind:'chat',msg:'Habari! Mimi pia nina miaka 10 😊 Unasoma shule gani? Labda tunaishi karibu!',q:'Ufanye nini?',o:[
   ['Mwambie shule yako. Ni mtoto kama wewe!',0,'Mtu yeyote anaweza kujifanya ana miaka 10 mtandaoni. Shule yako inamwonyesha mgeni mahali pa kukupata.'],
   ['Usimwambie, na umwambie mtu mzima unayemwamini',1,'Ndiyo! Shule yako, nyumbani na mahali unapoenda ni siri za kutunza. Mtu mzima anaweza kukusaidia kumzuia na kuripoti.'],
   ['Mtumie picha yako ukiwa umevaa sare badala yake',0,'Sare inaonyesha shule yako sawa na kutaja jina lake.']]},
  {app:['🎮','Tangazo la mchezo','Sasa hivi'],kind:'popup',msg:'🎉 UMESHINDA SARAFU 5,000 BURE! Andika namba ya simu ya mama yako ili uzipate sasa!',q:'Zawadi ya kweli au hila?',o:[
   ['Zawadi ya kweli! Andika namba haraka',0,'Zawadi zinazoomba namba za simu ni hila za kukusanya taarifa za familia.'],
   ['Ni hila! Ifunge na umwambie mtu mzima',1,'Sahihi. Michezo ya kweli haiombi namba za simu za familia ili ikupe sarafu.']]},
  {app:['🦁','SimbaKing','Rafiki wa mchezoni'],kind:'chat',msg:'Wewe ni rafiki yangu mkubwa 💛 Tuweke gumzo letu siri, sawa? Usiwaambie wazazi wako.',q:'Unajisikiaje kuhusu hili?',o:[
   ['Ni sawa, siri zinafurahisha',0,'Sapraizi ni sawa. Siri zinazowaacha nje watu wazima wako ni ishara ya hatari.'],
   ['Lo! Mwambie mtu mzima unayemwamini',1,'Umeona sawa kabisa. Mtu anayekuomba ufiche gumzo kutoka kwa familia yako si rafiki wa kweli.'],
   ['Acha tu kujibu na usiseme chochote',0,'Kuacha kujibu ni vizuri, lakini mwambie mtu mzima pia, ili akusaidie kumzuia na kuripoti.']]},
  {app:['🔒','Tableti yako','Mipangilio'],kind:'post',msg:'Binamu yako anakuomba nenosiri la mchezo wako ili “akusaidie kupanda ngazi”.',q:'Ufanye nini?',o:[
   ['Mpe. Ni familia',0,'Hata watu unaowapenda wanaweza kupoteza au kutumia vibaya nenosiri. Nenosiri linabaki kwako na mzazi wako.'],
   ['Litunze siri. Ni wewe na mzazi wako tu mnaolijua',1,'Ndiyo! Nenosiri ni kama mswaki: usimpe mtu.']]}
 ],
 wabunifu:[
  {app:['✨','@glowbrand.ke','Akaunti ya biashara'],kind:'chat',msg:'TUNAPENDA sana video zako za densi 🔥 Tunataka kukudhamini! Lipa tu KSh 500 za usajili na utume namba yako ya simu.',q:'Ofa ya kweli au utapeli?',o:[
   ['Lipa 500. Ni bei ndogo kwa mdhamini',0,'Kampuni za kweli huwalipa wabunifu. Hazikuombi uzilipe kwanza.'],
   ['Ni utapeli: kampuni za kweli haziombi malipo',1,'Kabisa. Piga picha ya skrini, mzuie, na umwonyeshe mtu mzima unayemwamini kama huna uhakika.'],
   ['Tuma namba yako lakini usilipe',0,'Namba yako inawawezesha kuendelea kukushinikiza. Usiitume.']]},
  {app:['🎤','Video inayovuma','Watazamaji milioni 1.2'],kind:'post',msg:'Video inamwonyesha mwanamuziki maarufu wa Kenya akisema: “Pakua programu hii upate muda wa maongezi BURE, kiungo kiko kwenye wasifu!” Midomo yake inaonekana si sawa kidogo.',q:'Utafanya nini?',o:[
   ['Ipakue. Ni maarufu, lazima iwe kweli',0,'AI inaweza kughushi nyuso na sauti. Umaarufu ndio sababu matapeli huwaiga.'],
   ['Angalia kwanza akaunti rasmi ya msanii',1,'Busara. Tafuta akaunti iliyothibitishwa. Kama tangazo halipo pale, huenda ni video bandia (deepfake).']]},
  {app:['📱','Rasimu yako','Karibu kuchapisha'],kind:'post',msg:'Video yako mpya ilirekodiwa nje ya geti lenu. Namba ya nyumba yenu na sweta ya shule yako vinaonekana.',q:'Kabla ya kuchapisha…',o:[
   ['Ichapishe. Hakuna anayeangalia mandhari ya nyuma',0,'Watu huangalia. Wageni wanaweza kuunganisha vidokezo hadi wajue unapoishi.'],
   ['Rekodi upya au fifisha namba ya nyumba na sare',1,'Ndiyo. Kagua mandhari ya nyuma, si wewe tu, kila mara.']]},
  {app:['🎨','@copycat_art','Imechapishwa upya'],kind:'post',msg:'Mtu amechapisha upya mchoro wako bila kukutaja, na anapata “likes” nyingi.',q:'Hatua bora inayofuata?',o:[
   ['Andika maoni ya matusi kila mahali',0,'Hilo linaweza kugeuka ugomvi na kuharibu sifa yako.'],
   ['Ripoti, omba utajwe, na utunze faili zako asili',1,'Vizuri. Faili zako asili zenye tarehe zinathibitisha ni kazi yako. Mtu mzima anaweza kukusaidia kuripoti.']]}
 ],
 walinzi:[
  {app:['💬','SMS · 0712 xxx xxx','Si kutoka M-PESA'],kind:'sms',msg:'Imethibitishwa. Umepokea Ksh2,500.00 kutoka kwa JOHN K… Tafadhali nirudishie, nimetuma kimakosa. Nipigie.',q:'Utafanya nini?',o:[
   ['Zirudishe. Uaminifu ni muhimu',0,'Huu ni utapeli wa kawaida wa “nirudishie”. SMS ilitoka kwa namba ya kawaida, na hakuna pesa iliyoingia.'],
   ['Angalia kwanza salio lako halisi la M-PESA, na usitume',1,'Sawa kabisa. Ujumbe halisi wa M-PESA hutoka kwa MPESA, si namba ya mtu binafsi. Angalia salio lako na uupuuze.'],
   ['Mpigie ili mlimalize',0,'Kumpigia kunampa nafasi ya kukushinikiza. Angalia salio lako, kisha upuuze au uripoti.']]},
  {app:['🙋','Rafiki yako Brian','Ujumbe wa Instagram'],kind:'chat',msg:'Bro tafadhali nipigie kura kwenye shindano 🙏 Nimetuma msimbo wa tarakimu 6 kwenye simu yako, nitumie!',q:'Je, utume msimbo?',o:[
   ['Ndiyo, ni rafiki yangu',0,'Akaunti ya Brian huenda imedukuliwa. Msimbo huo unawawezesha kuchukua akaunti YAKO.'],
   ['Hapana. Misimbo haitumwi kwa mtu. Mpigie Brian moja kwa moja',1,'Sahihi. Msimbo wa mara moja ni ufunguo wa akaunti yako. Thibitisha na Brian halisi kwa njia nyingine.']]},
  {app:['💼','Kazi za mtandaoni KE','Telegram'],kind:'chat',msg:'Pata KSh 3,000 kwa siku kwa kupenda video tu 👍 Weka KSh 1,000 ili ufungue kazi za premium.',q:'Uamuzi wako?',o:[
   ['Jaribu. Kazi za mwanzo zinaweza kulipa',0,'Utapeli wa kazi mara nyingi hulipa kidogo mwanzoni ili uweke pesa zaidi.'],
   ['Ni utapeli: kazi halisi hazikutozi pesa kuanza',1,'Ndiyo. “Kazi” yoyote inayohitaji uweke pesa inachukua pesa, haikulipi.']]},
  {app:['⚠️','Akaunti isiyojulikana','Ombi la ujumbe'],kind:'chat',msg:'Nina picha yako iliyohaririwa. Lipa KSh 5,000 la sivyo naituma kwenye kikundi cha shule yako.',q:'Hatua salama zaidi ni ipi?',o:[
   ['Lipa haraka ili limalizike',0,'Kulipa karibu kamwe hakumalizi jambo. Mara nyingi wanaomba zaidi.'],
   ['Usilipe. Hifadhi ushahidi, mzuie, mwambie mtu mzima unayemwamini na uripoti',1,'Sawa. Hujakosea chochote. Pata msaada: Childline 116 ni bure, na polisi wanaweza kuchukua hatua dhidi ya usaliti.'],
   ['Futa kila kitu na usimwambie mtu',0,'Tunza ushahidi. Unasaidia watu wazima, programu na polisi kuwazuia.']]}
 ],
 parents:[
  {app:['👧','Binti yako, 10','Jikoni'],kind:'chat',msg:'Mama… kuna mtu kwenye mchezo wangu anaendelea kuniomba picha yangu.',q:'Jibu lipi linasaidia zaidi?',o:[
   ['“Basi, hakuna michezo tena kwako!”',0,'Kupiga marufuku mchezo kunamfundisha kwamba kukwambia kunaleta adhabu.'],
   ['“Asante kwa kuniambia. Tuangalie pamoja, kisha tumzuie na kuripoti.”',1,'Ndiyo. Shukrani tulivu inamfanya aendelee kukwambia. Kisha hifadhi ushahidi, mzuie na uripoti.']]},
  {app:['🧒','Mwanao, 14','Jioni'],kind:'chat',msg:'Kampuni inataka kudhamini TikTok yangu, lakini lazima nilipe ada ya usajili.',q:'Ushauri bora?',o:[
   ['“Wadhamini wa kweli wanakulipa wewe. Tuangalie ni akina nani.”',1,'Sawa. Kampuni haziombi watoto walipe kwanza. Kagueni pamoja na mripoti.'],
   ['“Lipa kama ni kidogo. Huenda ni nafasi kubwa.”',0,'Ada na “usajili” ndio chambo katika utapeli mwingi wa udhamini bandia.']]},
  {app:['🧑','Kijana wako, 16','Usiku sana'],kind:'chat',msg:'Kuna mtu ana picha yangu bandia na anataka pesa la sivyo ataisambaza.',q:'Utasema nini kwanza?',o:[
   ['“Ulikuwaje mzembe hivyo?”',0,'Lawama huwafanya vijana waache kuongea, na wasaliti hutegemea ukimya huo.'],
   ['“Hujakosea. Tutalishughulikia pamoja. Usilipe.”',1,'Ndiyo. Mtulize, usilipe, hifadhi ushahidi, ripoti kwenye programu, na piga Childline 116 au polisi.']]}
 ]
}
};
