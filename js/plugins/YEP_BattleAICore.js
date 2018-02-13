//=============================================================================
// Yanfly Engine Plugins - Battle Artificial Intelligence Core
// YEP_BattleAICore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_BattleAICore = true;

var Yanfly = Yanfly || {};
Yanfly.CoreAI = Yanfly.CoreAI || {};

//=============================================================================
 /*:
 * @plugindesc v1.06 Esse plugin permite que você estruture padrões da
 * I.A. de batalha com mais controle.
 * @author Yanfly Engine Plugins
 *
 * @param Dynamic Actions
 * @desc Se habilitado, ações inimigas são decididas no momento em vez de no
 * começo da rodada. NÃO - false     SIM - true
 * @default true
 *
 * @param Element Testing
 * @desc Se habilitado, inimigos irão testar os personagem em seus elementos
 * por atacarem e depois verem se o aspecto está correto.
 * NÃO - false     SIM - true
 * @default true
 *
 * @param Default AI Level
 * @desc Esse é o level de IA padrão de todos os inimigos.
 * Level 0: Muito Aleatório     Level 100: Muito Rigoroso
 * @default 80
 *
 * @help
 * ============================================================================
 * Introdução
 * ============================================================================
 *
 * A IA padrão dos inimigos do RPG Maker MV é um pouco imprecisa até mesmo se
 * você conseguisse tê-la baseada completamente nas taxas e switches. Não
 * há nenhuma forma de controlar a forma que o inimigo escolhe alvos por
 * padrão, nem são as condições impostas pelo editor padrão suficientes para
 * satisfazer a maioria dos cheques. Esse plugin habilita a você a estabelecer
 * uma lista de prioridade de condições, ações, e o alvos selecionados para o
 * inimigo percorrer antes de fazer uma decisão em como participar na batalha.
 *
 * Essas condições contém todas as condições do editor padrões e mais, como
 * determinar os valores de parâmetros de um alvo, se um estado existe ou não
 * em um alvo, a fraqueza (ou resistência) elemental do alvo, e mais antes de
 * decidir uma ação. Além disso, você pode estabelecer o level de IA para os
 * inimigos para fazê-los mais consistentes na forma em que eles lutam contra
 * seus jogadores ou mas aleatória a forma com que inimigos tratam a lista de
 * prioridades, também.
 *
 * ============================================================================
 * Parâmetros
 * ============================================================================
 *
 * Ações Dinâmicas
 * Por padrão, as ações inimigas são determinadas no começo da rodada. Embora
 * isso funcione, habilitando Ações Dinâmicas permitem inimigos a fazerem
 * uma decisão quando sua vez na rodada chegar. Isso faz com que inimigos
 * sejam mais flexíveis e pareçam mais inteligentes na batalha, assim,
 * dando aos seus jogadores um desafio maior.
 *
 * Teste de Elemento
 * Se isso for desabilitado, inimigos irão saber automaticamente a fraqueza
 * elemental, resistência, etc, sobre todos os personagens. Se habilitado,
 * os inimigos precisarão testar as habilidades em vários personagens
 * primeiro antes de fazer uma decisão. Até que o inimigo aprenda sobre as
 * taxas de elemento sobre o personagem, o inimigo estará sempre disposto a
 * tentar usar a habilidade no personagem alvo. Porém, se a habilidade em si
 * não possuir um elemento, então nenhuma informação será registrada. Todas
 * as informações de elementos são resetadas no início de cada batalha para
 * todas as parties inimigas.
 *
 * Level de IA Padrão
 * Nem todos os inimigos são inteligentes. De fato, alguns são burros ou
 * aleatórios. Estabelecer o level de IA de um adversário em um número
 * baixo quer dizer que o adversário é mais aleatório enquanto que uma IA
 * de level mais alto é mais consistente. Como a IA funciona é: um número
 * aleatório vai ser checado de 0 a 99. Se a IA do inimigo for mais alta que
 * aquele número, aquela ação é checada pra ver se a condição é realizada ou
 * não. Se o level de IA é menor que aquele número, a condição é
 * automaticamente considerada falsa e continua para a próxima ação. O cheque
 * é executado cada vez que uma nova ação é verificada. Esse fator aleatório
 * é apenas aplicado para listas de <AI Priority> e não se aplicam às ações
 * padrões.
 *
 * ============================================================================
 * Level de IA Inimiga
 * ============================================================================
 *
 * Levels de IA Inimiga não determinam o quão difíceis eles são. Em vez disso,
 * eles determinam o quão rigoroso eles irão seguir a lista de <AI Priority>.
 * Um level de IA de 80 quer dizer que ele tem 80% de chance de seguir a
 * ação priorizada na lista de prioridade de IA antes de ir para a próxima
 * onde haverá outros 80% de chance e assim vai. Se o level de IA for menor, a
 * chance é menor, fazendo a AI mais aleatória.
 *
 * Notetag Inimiga:
 *   <AI Level: x>
 *   Estabelece o level de IA inimiga para x. Quanto menor x é, mais
 *   aleatório é o inimigo. Quanto maior x é, mais rigoroso o inimigo é sobre
 *   seguir a lista de prioridade de IA achada em seu notebox, também.
 *
 * ============================================================================
 * Prioridade de IA Inimiga
 * ============================================================================
 *
 * Se um inimigo tem uma lista de prioridade de IA, o inimigo irá percorrer
 * essa lista de cima pra baixo (dando as ações no topo mais prioridade que
 * as ações em baixo) procurando por quaisquer ações cujas condições são
 * realizadas. Se essa condição for realizada, então essa ação será a ação
 * que o inimigo irá participar nela.
 *
 * Para estabelecer uma lista de prioridade para o inimigo, você precisa por
 * notetags dentro do notebox do inimigo que combinem com o seguinte formato:
 *
 *   <AI Priority>                        <AI Priority>
 *    condição: habilidade x, alvo   ou    condição: nome da habilidade, alvo
 *    condição: habilidade x, alvo         condição: nome da habilidade, alvo
 *   </AI Priority>                       </AI Priority>
 *
 * Qualquer número de condições e habilidades podem ser colocadas entre os
 * dois tags de <AI Priority>. Você pode escolher usar os ID's das habilidades
 * ou os nomes das habilidades. Porém, se você escolher os nomes das
 * habilidades, tenha em mente que maiúsculas e minúsculas não importam e que
 * se quaisquer habilidades no seu banco de dados terem nomes iguais, a
 * habilidade com um maior ID de hablidade vai ser a ação usada.
 *
 * ============================================================================
 * Condições
 * ============================================================================
 *
 * Aqui está uma lista de formas que você pode formatar suas condições para
 * que o inimigo escolha a habilidade certa. Em adição em escolher se a
 * hablidade será ou não usada, a condição também seleciona o alvo inimigo.
 * A seguinte lista irá informar a você como as condições são concedidas e
 * quais alvos serão selecionados para batalha.
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ALWAYS
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Essa condição sempre será realizada. O grupo de alvos válidos são todos os
 * alvos dentro do alcançe.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo:   Always: Skill 10, Lowest HP%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ELEMENT X case
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso permite a você igualar a taxa de elemento do elemento x (use um
 * número ou o nome do elemento no lugar de 'X') para ver se as condições
 * para a ação serão realizadas ou não. Substitua 'case' com 'Neutral' para
 * taxa de elemento normal, 'Weakness' para qualquer coisa acima de 100% de
 * taxa de elemento, 'Resistant' para abaixo de 100% de taxa de elemento,
 * 'Null', para 0% de taxa de elemento, e 'Absorb' para abaixo de 0% de taxa
 * de elemento. Alvos válidos serão aqueles com taxas de elementos igualados.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo:   Element Fire Weakness: Fireball, Lowest HP%
 *            Element Water Resistant: Water Cancel, Highest MAT
 *            Element 4 Null: Earthquake, Lowest MDF
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * EVAL eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso permite a você usar qualquer tipo de código para checar e realizar a
 * condição. Essa condição usa todos os membros vivos do alcançe da habilidade
 * como alvos válidos.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo:   Eval user.name() === 'Bat A': Skill 10, Highest HP%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * group ALIVE MEMBERS eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Substitua 'group' para 'party' para a party do jogador, ou 'troop' para a
 * party inimiga. Isso executa o número de membros vivos da party ou os membros
 * vivos da troop em cheque para ver se as condições podem ser realizadas.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo:   Party Alive Members > 2: Skill 10, Lowest HP%
 *            Troop Alive Members <= 4: Skill 11, Highest HP%
 *            Troop Alive Members === $gameVariables.value(3): Skill 12, Random
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * group DEAD MEMBERS eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Substitua 'group' para 'party' para a party do jogador, ou 'troop' para a
 * party inimiga. Isso executa o número de membros mortos da party ou os
 * membros mortos da troop em cheque para ver se as condições podem ser
 * realizadas.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo:   Party Dead Members > 2: Undead, Highest ATK
 *            Troop Dead Members <= 4: Life, Highest ATK
 *            Troop Dead Members === $gameVariables.value(3): Skill 12, Random
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * stat PARAM eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Substitua 'stat' por 'atk', 'def', 'mat', 'mdf', 'agi', 'luk', 'maxhp',
 * 'maxmp', 'hp', 'mp', 'hp%', 'mp%', ou 'level' para executá-la em um cheque
 * de condição de novo para ver se a ação é passada. O grupo que ele checa
 * será beseado no alcançe da habilidade. Se a hablidade ter como alvo
 * adversários, então todos os adversários vão levar um cheque para ver se
 * eles realizam as condições. Da mesma forma com membros da party se a
 * habilidade for para aliados. Os alvos válidos serão aqueles que passam
 * do cheque de condição.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo:   HP% param <= 50%: Heal, Lowest HP%
 *            MP param > 90: Mana Drain, Highest MP
 *            ATK param > user.atk: Power Break, Highest ATK
 *            LEVEL param > 10 && target.notState(5): Blind, Random
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * type PARTY LEVEL eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Substitua 'type' por 'highest', 'lowest', ou 'average' para ter o
 * respectivo level da party para o alcançe da habilidade. Isso irá ter como
 * referência todo o level da party. Se essa condição for realizada, todos os
 * alvos irão se tornar alvos válidos.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo:   Highest Party Level > 10: Skill 10, Lowest MP%
 *            Lowest Party Level < 12: Skill 11, Lowest HP%
 *            Average Party Level > 15: Skill 12, Highest HP%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * RANDOM x%
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso irá fazer a condição baseada numa chance aleatória de x porcento.
 * Essa condição permite todos os possíveis alvos a serem alvos válidos.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo:   Random 50%: Skill 10, Lowest HP%
 *            Random 75%: Skill 11, Highest HP%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * STATE === state x
 * STATE === state name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso irá detectar se o alcançe do alvo tem um estado x (ou nome de estado
 * se você usar em vez disso). Se o alvo tiver, o alvo é adicionado ao
 * grupo de alvos válidos. Quaisquer alvos não afetados pelo estado serão
 * ignorados.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo:   State === State 5: DeBlind, Highest ATK
 *            State === Knockout: Life, Random
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * STATE !== state x
 * STATE !== state name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso irá detectar se o alcançe do alvo não tem um estado x (ou nome de
 * estado se você usar em vez disso). Se o alvo não tiver, o alvo é adicionado
 * ao grupo de alvos válidos. Quaisquer alvos afetados pelo estado serão
 * ignorados.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo:   State !== State 12: Haste, Random
 *            State !== Courage: Cowardice, Highest ATK
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * SWITCH X case
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Substitua 'x' pelo ID do switch que você deseja checar. Substitua 'case' por
 * 'on' ou 'off' (você também pode usar 'true' ou 'false'). Se o switch igualar
 * ao case, a condição é realizada e todos os alvos de habilidades viram alvos
 * válidos.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo:   Switch 5 On: Skill 10, Lowest HP%
 *            Switch 6 Off: Skill 11, Highest HP%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TURN eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso fará a condição ser baseada na contagem de rodadas para ser realizada
 * por uma afirmação eval. Essa condição permite todos os alvos possíveis a
 * serem alvos válidos.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo:   Turn > 3: Skill 10, Lowest hp%
 *            Turn === 4: Skill 11, Highest hp%
 *            Turn <= $gameVariables.value(2): Skill 12, Random
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * VARIABLE X eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso irá usar o valor da variável 'x' a participar numa comparação eval
 * para ver se a condição é realizada. Se for, todos os alvos de habilidades
 * se tornarão alvos válidos.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo:   Variable 3 > 10: Skill 10, Lowest HP%
 *            Variable 5 <= 100: Skill 11, Highest HP%
 *            Variable 2 === user.atk: Skill 12
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * ============================================================================
 * Selecionamento de Alvo
 * ============================================================================
 *
 * Selecionamento de Alvo é opcional mas pode ser feito por uma pequena
 * mudança na condição. Tudo que você tem que fazer é adicionar um ',' depois
 * da habilidade para indicar qual alvo no grupo de alvos válidos você quer
 * que seja o alvo. Por exemplo:
 *
 *             Random 50%: Fire, Highest HP%
 *
 * A condição a ser verificada é a de 50% de chance aleatória, mas se ela for
 * realizada, o alvo selecionado vai ser o membro do time de alvos
 * selecionáveis com a maior porcentagem de HP. Quando isso acontecer, a
 * habilidade 'Fire' será usada no alvo.
 *
 * Se nenhum alvo for especificado, um alvo aleatório vai ser selecionado
 * dentre o grupo de alvos válidos. Caso contrário, refira-se à seguinte
 * lista:
 *
 * ----------------------------------------------------------------------------
 *      <<nothing>>    Seleciona um membro aleatório do grupo de alvos válidos.
 *      First          Seleciona o primeiro membro do grupo de alvos válidos.
 *      Highest MaxHP  Seleciona o alvo válido com maior MaxHP.
 *      Highest HP     Seleciona o alvo válido com maior HP.
 *      Highest HP%    Seleciona o alvo válido com maior HP%. *Nota1
 *      Highest MaxMP  Seleciona o alvo válido com maior MaxMP.
 *      Highest MP     Seleciona o alvo válido com maior MP.
 *      Highest MP%    Seleciona o alvo válido com maior MP%. *Nota1
 *      Highest ATK    Seleciona o alvo válido com maior ATK.
 *      Highest DEF    Seleciona o alvo válido com maior DEF.
 *      Highest MAT    Seleciona o alvo válido com maior MAT.
 *      Highest MDF    Seleciona o alvo válido com maior MDF.
 *      Highest AGI    Seleciona o alvo válido com maior AGI.
 *      Highest LUK    Seleciona o alvo válido com maior LUK.
 *      Highest Level  Seleciona o alvo válido com maior level. *Nota2
 *      Lowest MaxHP   Seleciona o alvo válido com menor MaxHP.
 *      Lowest HP      Seleciona o alvo válido com menor HP.
 *      Lowest HP%     Seleciona o alvo válido com menor HP%. *Nota1
 *      Lowest MaxMP   Seleciona o alvo válido com menor MaxMP.
 *      Lowest MP      Seleciona o alvo válido com menor MP.
 *      Lowest MP%     Seleciona o alvo válido com menor MP%. *Nota1
 *      Lowest ATK     Seleciona o alvo válido com menor ATK.
 *      Lowest DEF     Seleciona o alvo válido com menor DEF.
 *      Lowest MAT     Seleciona o alvo válido com menor MAT.
 *      Lowest MDF     Seleciona o alvo válido com menor MDF.
 *      Lowest AGI     Seleciona o alvo válido com menor AGI.
 *      Lowest LUK     Seleciona o alvo válido com menor LUK.
 *      Lowest Level   Seleciona o alvo válido com menor level. *Nota2
 *
 * Nota1: Isso é calculado por dividir o atual HP com o MaxHP ou o atual MP
 * com o MaxMP.
 *
 * Nota2: Se isso for usado em um inimigo sem um plugin adequado de level
 * inimigo instalado, isso irá retornar o maior level da party do jogador.
 *
 * ----------------------------------------------------------------------------
 *
 * ============================================================================
 * Notas Especiais
 * ============================================================================
 *
 * Se você estiver usando YEP_Taunt.js, inimigos irão automaticamente não ter
 * taunts por padrão. Por esse motivo, alvos podem ser protegidos por efeitos
 * de taunts, o que pode efetivamente desligar a performance da IA de um
 * inimigo. Porém, se você quiser que alguns inimigos considerem o efeito taunt
 * de um oponente, coloque esse notetag dentro do notebox do inimigo:
 *
 *   <AI Consider Taunt>
 *
 * Isso fará com que quando um inimigo fazer uma decisão, ele fará uma decisão
 * certa enquanto pensando nos inimigos taunted, também. Você pode usar isso
 * para inimigos mais espertos enquanto mantém esse notetag desabilitado para
 * adversários menos inteligentes.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.06:
 * - Fixed a bug that caused 'Highest TP' and 'Lowest TP' target searches to
 * crash the game.
 *
 * Version 1.05:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.04a:
 * - Fixed a bug that would cause a crash with the None scope for skills.
 * - Switched over a function to operate in another for better optimization.
 *
 * Version 1.03:
 * - Fixed a bug that returned the wrong MP% rate.
 *
 * Version 1.02:
 * - Fixed a bug that targeted the highest parameter enemy instead of lowest.
 *
 * Version 1.01:
 * - Added 'MaxTP' and 'TP' to targets.
 * - Compatibility update with Battle Engine Core v1.19+. Turn settings are now
 * based 'AI Self Turns' if the enabled.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_BattleAICore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.CoreAIDynamic = String(Yanfly.Parameters['Dynamic Actions']);
Yanfly.Param.CoreAIElementTest = String(Yanfly.Parameters['Element Testing']);
Yanfly.Param.CoreAIDefaultLevel = Number(Yanfly.Parameters['Default AI Level']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.CoreAI.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.CoreAI.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_BattleAICore) {
    this.processCoreAINotetags1($dataEnemies);
    this.processCoreAINotetags2($dataSkills);
    this.processCoreAINotetags3($dataStates);
    this.processCoreAINotetags4($dataSystem);
    Yanfly._loaded_YEP_BattleAICore = true;
  }
  return true;
};

DataManager.processCoreAINotetags1 = function(group) {
  var note1 = /<(?:AI PRIORITY)>/i;
  var note2 = /<\/(?:AI PRIORITY)>/i;
  var note3 = /<(?:AI CONSIDER TAUNT|ai considers taunts)>/i;
  var note4 = /<(?:AI LEVEL):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.aiPattern = [];
    var aiPatternFlag = false;
    obj.aiConsiderTaunt = false;
    obj.aiLevel = Yanfly.Param.CoreAIDefaultLevel * 0.01;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        aiPatternFlag = true;
      } else if (line.match(note2)) {
        aiPatternFlag = false;
      } else if (aiPatternFlag) {
        obj.aiPattern.push(line);
      } else if (line.match(note3)) {
        obj.aiConsiderTaunt = true;
      } else if (line.match(note4)) {
        obj.aiLevel = parseFloat(RegExp.$1 * 0.01);
      }
    }
  }
};

DataManager.processCoreAINotetags2 = function(group) {
  if (Yanfly.SkillIdRef) return;
  Yanfly.SkillIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.SkillIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processCoreAINotetags3 = function(group) {
  if (Yanfly.StateIdRef) return;
  Yanfly.StateIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.StateIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processCoreAINotetags4 = function(group) {
  if (Yanfly.ElementIdRef) return;
  Yanfly.ElementIdRef = {};
  for (var i = 0; i < group.elements.length; ++i) {
    var obj = group.elements[i].toUpperCase();
    if (typeof obj === 'string' && obj !== '') Yanfly.ElementIdRef[obj] = i;
  }
};

//=============================================================================
// BattleManager
//=============================================================================

if (eval(Yanfly.Param.CoreAIDynamic)) {
  Yanfly.CoreAI.BattleManager_getNextSubject =
      BattleManager.getNextSubject;
  BattleManager.getNextSubject = function() {
    this.updateAIPatterns();
    return Yanfly.CoreAI.BattleManager_getNextSubject.call(this);
  };
};

BattleManager.updateAIPatterns = function() {
    $gameTroop.updateAIPatterns()
};

Yanfly.CoreAI.BattleManager_isInputting = BattleManager.isInputting;
BattleManager.isInputting = function() {
  if ($gameTemp._tauntMode) return false;
  return Yanfly.CoreAI.BattleManager_isInputting.call(this);
};

//=============================================================================
// Game_Battler
//=============================================================================

Object.defineProperty(Game_Battler.prototype, 'level', {
    get: function() {
        return this.getLevel();
    },
    configurable: true
});

if (!Game_Battler.prototype.getLevel) {
  Game_Battler.prototype.getLevel = function() {
      return $gameTroop.highestLevel();
  };
};

Game_Battler.prototype.setAIPattern = function() {
    Game_Battler.prototype.makeActions.call(this);
};

Game_Battler.prototype.aiConsiderTaunt = function() {
  return false;
};

Game_Battler.prototype.hasSkill = function(skillId) {
    return this.skills().contains($dataSkills[skillId]);
};

Game_Battler.prototype.hasState = function(stateId) {
    return this.isStateAffected(stateId);
};

Game_Battler.prototype.notState = function(stateId) {
    return !this.isStateAffected(stateId);
};

Game_Battler.prototype.aiLevel = function() {
    return Yanfly.Param.CoreAIDefaultLevel * 0.01;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.skills = function() {
  var skills = []
  for (var i = 0; i < this.enemy().actions.length; ++i) {
    var skill = $dataSkills[this.enemy().actions[i].skillId]
    if (skill) skills.push(skill);
  }
  skills = AIManager.getPatternSkills(skills, this.enemy().aiPattern);
  return skills;
};

Yanfly.CoreAI.Game_Enemy_makeActions = Game_Enemy.prototype.makeActions;
Game_Enemy.prototype.makeActions = function() {
    if (this.enemy().aiPattern.length > 0) {
      this.setAIPattern();
      this.setActionState('waiting');
    } else {
      Yanfly.CoreAI.Game_Enemy_makeActions.call(this);
    }
};

Game_Enemy.prototype.aiConsiderTaunt = function() {
  if (!Imported.YEP_Taunt) return false;
  return this.enemy().aiConsiderTaunt;
};

Game_Enemy.prototype.setAIPattern = function() {
    Game_Battler.prototype.setAIPattern.call(this);
    if (this.numActions() <= 0) return;
    AIManager.setBattler(this);
    for (var i = 0; i < this.enemy().aiPattern.length; ++i) {
      if (Math.random() > this.aiLevel()) continue;
      var line = this.enemy().aiPattern[i];
      if (AIManager.isDecidedActionAI(line)) return;
    }
    Yanfly.CoreAI.Game_Enemy_makeActions.call(this);
};

Game_Enemy.prototype.aiLevel = function() {
    return this.enemy().aiLevel;
};

//=============================================================================
// Game_Unit
//=============================================================================

Game_Unit.prototype.highestLevel = function() {
    return $gameParty.highestLevel();
};

Game_Unit.prototype.lowestLevel = function() {
    return $gameParty.lowestLevel();
};

Game_Unit.prototype.averageLevel = function() {
    return $gameParty.averageLevel();
};

Yanfly.CoreAI.Game_Unit_onBattleStart = Game_Unit.prototype.onBattleStart;
Game_Unit.prototype.onBattleStart = function() {
    Yanfly.CoreAI.Game_Unit_onBattleStart.call(this);
};

Game_Unit.prototype.aiElementRateKnown = function(target, elementId) {
    return true;
};

Game_Unit.prototype.aiRegisterElementRate = function(target, elementId) {
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.lowestLevel = function() {
    return Math.min.apply(null, this.members().map(function(actor) {
        return actor.level;
    }));
};

Game_Party.prototype.averageLevel = function() {
    var level = 0;
    for (var i = 0; i < this.members().length; ++i) {
      var member = this.members()[i];
      if (member) level += member.level;
    }
    level /= this.members().length;
    return level;
};

//=============================================================================
// Game_Troop
//=============================================================================

Game_Troop.prototype.updateAIPatterns = function() {
    for (var i = 0; i < this.aliveMembers().length; ++i) {
      var member = this.aliveMembers()[i];
      if (member) member.setAIPattern();
    }
};

Yanfly.CoreAI.Game_Troop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) {
    Yanfly.CoreAI.Game_Troop_setup.call(this, troopId);
    this._aiKnownElementRates = {};
};

Game_Troop.prototype.aiElementRateKnown = function(target, elementId) {
    if (target.isEnemy()) return true;
    if (!eval(Yanfly.Param.CoreAIElementTest)) return true;
    var index = target.index();
    if (this._aiKnownElementRates[index] === undefined) {
      this._aiKnownElementRates[index] = [];
    }
    return this._aiKnownElementRates[index].contains(elementId);
};

Game_Troop.prototype.aiRegisterElementRate = function(target, elementId) {
    if (!eval(Yanfly.Param.CoreAIElementTest)) return;
    var index = target.index();
    if (this._aiKnownElementRates[index] === undefined) {
      this._aiKnownElementRates[index] = [];
    }
    if (!this._aiKnownElementRates[index].contains(elementId)) {
      this._aiKnownElementRates[index].push(elementId);
    }
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.CoreAI.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    Yanfly.CoreAI.Game_Action_apply.call(this, target);
    this.aiRegisterElementRate(target);
};

Game_Action.prototype.aiRegisterElementRate = function(target) {
    if (this.item().damage.elementId < 0) return;
    var elementId = this.item().damage.elementId;
    if (this.subject().isActor()) {
      $gameParty.aiRegisterElementRate(target, elementId);
    } else {
      $gameTroop.aiRegisterElementRate(target, elementId);
    }
};

//=============================================================================
// AIManager
//=============================================================================

function AIManager() {
    throw new Error('This is a static class');
}

AIManager.setBattler = function(battler) {
    this._battler = battler;
    this._action = battler.action(0);
};

AIManager.battler = function() {
    return this._battler;
};

AIManager.action = function() {
    return this._action;
};

AIManager.isDecidedActionAI = function(line) {
    if (line.match(/[ ]*(.*):[ ](?:SKILL)[ ](\d+),[ ](.*)/i)) {
      this._origCondition =  String(RegExp.$1);
      var condition = String(RegExp.$1);
      this._aiSkillId = parseInt(RegExp.$2);
      this._aiTarget = String(RegExp.$3);
    } else if (line.match(/[ ]*(.*):[ ](?:SKILL)[ ](\d+)/i)) {
      this._origCondition =  String(RegExp.$1);
      var condition = String(RegExp.$1);
      this._aiSkillId = parseInt(RegExp.$2);
      this._aiTarget = 'RANDOM';
    } else if (line.match(/[ ]*(.*):[ ](.*),[ ](.*)/i)) {
      this._origCondition =  String(RegExp.$1);
      var condition = String(RegExp.$1);
      this._aiSkillId = Yanfly.SkillIdRef[String(RegExp.$2).toUpperCase()];
      this._aiTarget = String(RegExp.$3);
    } else if (line.match(/[ ]*(.*):[ ](.*)/i)) {
      this._origCondition =  String(RegExp.$1);
      var condition = String(RegExp.$1);
      this._aiSkillId = Yanfly.SkillIdRef[String(RegExp.$2).toUpperCase()];
      this._aiTarget = 'RANDOM';
    } else {
      return false;
    }
    if (!this.initialCheck(this._aiSkillId)) return false;
    this.action().setSkill(this._aiSkillId);
    if (!this.passAIConditions(condition)) return false;
    return true;
};

AIManager.getPatternSkills = function(array, patterns) {
    for (var i = 0; i < patterns.length; ++i) {
      var line = patterns[i];
      if (line.match(/[ ]*(.*):[ ](?:SKILL)[ ](\d+),[ ](.*)/i)) {
        var skillId = parseInt(RegExp.$2);
      } else if (line.match(/[ ]*(.*):[ ](?:SKILL)[ ](\d+)/i)) {
        var skillId = parseInt(RegExp.$2);
      } else if (line.match(/[ ]*(.*):[ ](.*),[ ](.*)/i)) {
        var skillId = Yanfly.SkillIdRef[String(RegExp.$2).toUpperCase()];
      } else if (line.match(/[ ]*(.*):[ ](.*)/i)) {
        var skillId = Yanfly.SkillIdRef[String(RegExp.$2).toUpperCase()];
      } else {
        continue;
      }
      if ($dataSkills[skillId]) array.push($dataSkills[skillId]);
    }
    return array;
};

AIManager.initialCheck = function(skillId) {
  if (!$dataSkills[skillId]) return false;
  if (!this.hasSkill(skillId)) return false;
  return this.battler().meetsSkillConditions($dataSkills[skillId]);
};

AIManager.hasSkill = function(skillId) {
    return this.battler().hasSkill(skillId);
};

AIManager.getActionGroup = function() {
    var action = this.action();
    if (!action) return [];
    if (action.isForUser()) {
      var group = [this.battler()];
    } else if (action.isForDeadFriend()) {
      var group = action.friendsUnit().deadMembers();
    } else if (action.isForFriend()) {
      var group = action.friendsUnit().aliveMembers();
    } else if (action.isForOpponent()) {
      if (this.battler().aiConsiderTaunt()) {
        $gameTemp._tauntMode = true;
        $gameTemp._tauntAction = action;
        var group = action.opponentsUnit().tauntMembers();
        $gameTemp._tauntMode = false;
        $gameTemp._tauntAction = undefined;
      } else {
        var group = action.opponentsUnit().aliveMembers();
      }
    } else {
      var group = [];
    }
    return group;
};

AIManager.setProperTarget = function(group) {
    var action = this.action();
    var randomTarget = group[Math.floor(Math.random() * group.length)];
    if (!randomTarget) return action.setTarget(0);
    if (group.length <= 0) return action.setTarget(randomTarget.index());
    var line = this._aiTarget.toUpperCase();
    if (line.match(/FIRST/i)) {
      action.setTarget(0);
    } else if (line.match(/HIGHEST[ ](.*)/i)) {
      var param = this.getParamId(String(RegExp.$1));
      if (param < 0) return action.setTarget(randomTarget.index());
      if (param === 8) return this.setHighestHpFlatTarget(group);
      if (param === 9) return this.setHighestMpFlatTarget(group);
      if (param === 10) return this.setHighestHpRateTarget(group);
      if (param === 11) return this.setHighestMpRateTarget(group);
      if (param === 12) return this.setHighestLevelTarget(group);
      if (param === 13) return this.setHighestMaxTpTarget(group);
      if (param === 14) return this.setHighestTpTarget(group);
      if (param > 15) return action.setTarget(randomTarget.index());
      this.setHighestParamTarget(group, param);
    } else if (line.match(/LOWEST[ ](.*)/i)) {
      var param = this.getParamId(String(RegExp.$1));
      if (param < 0) return action.setTarget(randomTarget.index());
      if (param === 8) return this.setLowestHpFlatTarget(group);
      if (param === 9) return this.setLowestMpFlatTarget(group);
      if (param === 10) return this.setLowestHpRateTarget(group);
      if (param === 11) return this.setLowestMpRateTarget(group);
      if (param === 12) return this.setLowestLevelTarget(group);
      if (param === 13) return this.setLowestMaxTpTarget(group);
      if (param === 14) return this.setLowestTpTarget(group);
      if (param > 15) return action.setTarget(randomTarget.index());
      this.setLowestParamTarget(group, param);
    } else {
      this.setRandomTarget(group);
    }
};

AIManager.getParamId = function(string) {
    string = string.toUpperCase()
    switch (string) {
    case 'MAXHP':
    case 'MAX HP':
      return 0;
      break;
    case 'MAXMP':
    case 'MAX MP':
    case 'MAXSP':
    case 'MAX SP':
      return 1;
      break;
    case 'ATK':
    case 'STR':
      return 2;
      break;
    case 'DEF':
      return 3;
      break;
    case 'MAT':
    case 'INT':
    case 'SPI':
      return 4;
      break;
    case 'MDF':
    case 'RES':
      return 5;
      break;
    case 'AGI':
    case 'SPD':
      return 6;
      break;
    case 'LUK':
      return 7;
      break;
    case 'HP':
      return 8;
      break;
    case 'MP':
    case 'SP':
      return 9;
      break;
    case 'HP%':
      return 10;
      break;
    case 'MP%':
    case 'SP%':
      return 11;
      break;
    case 'LEVEL':
    case 'LV':
    case 'LVL':
      return 12;
      break;
    case 'MAXTP':
      return 13;
      break;
    case 'TP':
      return 14;
      break;
    }
    return -1;
};

AIManager.setHighestHpRateTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.hp / target.mhp > maintarget.hp / maintarget.mhp) {
        maintarget = target;
      }
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestHpFlatTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.hp > maintarget.hp) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestHpRateTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.hp / target.mhp < maintarget.hp / maintarget.mhp) {
        maintarget = target;
      }
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestHpFlatTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.hp < maintarget.hp) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestMpRateTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.mp / target.mmp > maintarget.mp / maintarget.mmp) {
        maintarget = target;
      }
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestMpFlatTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.mp > maintarget.mp) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestMpRateTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.mp / target.mmp < maintarget.mp / maintarget.mmp) {
        maintarget = target;
      }
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestMpFlatTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.mp < maintarget.mp) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestParamTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.param(id) > maintarget.param(id)) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestParamTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.param(id) < maintarget.param(id)) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestLevelTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.level > maintarget.level) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestLevelTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.level < maintarget.level) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestMaxTpTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.level > maintarget.maxTp()) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestMaxTpTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.level < maintarget.maxTp()) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestTpTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.level > maintarget.tp) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestTpTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.level < maintarget.tp) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setRandomTarget = function(group) {
    var target = group[Math.floor(Math.random() * group.length)];
    this.action().setTarget(target.index())
};

AIManager.convertIntegerPercent = function(n) {
    n *= 0.01
    return String(n);
};

AIManager.elementRateMatch = function(target, elementId, type) {
    var rate = target.elementRate(elementId).toFixed(2);
    if (this.battler().isActor()) {
      if (!$gameParty.aiElementRateKnown(target, elementId)) return true;
    } else {
      if (!$gameTroop.aiElementRateKnown(target, elementId)) return true;
    }
    if (['NEUTRAL', 'NORMAL'].contains(type)) {
      return rate === 1.00;
    } else if (['WEAK', 'WEAKNESS', 'VULNERABLE'].contains(type)) {
      return rate > 1.00;
    } else if (['RESIST', 'RESISTANT', 'STRONG'].contains(type)) {
      return rate < 1.00;
    } else if (['NULL', 'CANCEL', 'NO EFFECT'].contains(type)) {
      return rate === 0.00;
    } else if (['ABSORB', 'HEAL'].contains(type)) {
      return rate < 0.00;
    }
    return false;
};

AIManager.passAIConditions = function(line) {
    // ALWAYS
    if (line.match(/ALWAYS/i)) {
      return this.conditionAlways();
    }
    // ELEMENT
    if (line.match(/ELEMENT[ ](.*)/i)) {
      return this.conditionElement();
    }
    // EVAL
    if (line.match(/EVAL[ ](.*)/i)) {
      var condition = String(RegExp.$1);
      return this.conditionEval(condition);
    }
    // GROUP ALIVE MEMBERS EVAL
    if (line.match(/(.*)[ ]ALIVE[ ]MEMBERS[ ](.*)/i)) {
      var members = String(RegExp.$1);
      var condition = String(RegExp.$2);
      return this.conditionGroupAlive(members, condition);
    }
    // GROUP DEAD MEMBERS EVAL
    if (line.match(/(.*)[ ]DEAD[ ]MEMBERS[ ](.*)/i)) {
      var members = String(RegExp.$1);
      var condition = String(RegExp.$2);
      return this.conditionGroupDead(members, condition);
    }
    // PARAM EVAL
    if (line.match(/(.*)[ ]PARAM[ ](.*)/i)) {
      var paramId = this.getParamId(String(RegExp.$1));
      var condition = String(RegExp.$2);
      return this.conditionParamEval(paramId, condition);
    }
    // PARTY LEVEL
    if (line.match(/(.*)[ ]PARTY[ ]LEVEL[ ](.*)/i)) {
      var type = String(RegExp.$1);
      var condition = String(RegExp.$2);
      return this.conditionPartyLevel(type, condition);
    }
    // RANDOM x%
    if (line.match(/RANDOM[ ](\d+)([%％])/i)) {
      return this.conditionRandom(parseFloat(RegExp.$1 * 0.01));
    }
    // STATE === X
    if (line.match(/STATE[ ]===[ ](.*)/i)) {
      return this.conditionStateHas(String(RegExp.$1));
    }
    // STATE !== X
    if (line.match(/STATE[ ]!==[ ](.*)/i)) {
      return this.conditionStateNot(String(RegExp.$1));
    }
    // SWITCH X case
    if (line.match(/SWITCH[ ](\d+)[ ](.*)/i)) {
      var switchId = parseInt(RegExp.$1);
      var value = String(RegExp.$2)
      return this.conditionSwitch(switchId, value);
    }
    // TURN EVAL
    if (line.match(/TURN[ ](.*)/i)) {
      return this.conditionTurnCount(String(RegExp.$1));
    }
    // VARIABLE X eval
    if (line.match(/VARIABLE[ ](\d+)[ ](.*)/i)) {
      var variableId = parseInt(RegExp.$1);
      var condition = String(RegExp.$2)
      return this.conditionVariable(variableId, condition);
    }
    return false;
};

AIManager.conditionAlways = function() {
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionElement = function() {
    var line = this._origCondition;
    if (line.match(/ELEMENT[ ](\d+)[ ](.*)/i)) {
      var elementId = parseInt(RegExp.$1);
      var type = String(RegExp.$2).toUpperCase();
    } else if (line.match(/ELEMENT[ ](.*)[ ](.*)/i)) {
      var elementId = Yanfly.ElementIdRef[String(RegExp.$1).toUpperCase()];
      var type = String(RegExp.$2).toUpperCase();
    } else {
      return false;
    }
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      if (this.elementRateMatch(target, elementId, type)) {
        validTargets.push(target);
      }
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
};

AIManager.conditionEval = function(condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    if (!eval(condition)) return false;
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionGroupAlive = function(members, condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    members = members.toUpperCase();
    if (['TROOP', 'TROOPS', 'ENEMY', 'ENEMIES'].contains(members)) {
      members = $gameTroop.aliveMembers();
    } else if (['PARTY', 'PLAYER'].contains(members)) {
      members = $gameParty.aliveMembers();
    } else {
      return false;
    }
    if (members.length <= 0) return false;
    condition = 'members.length ' + condition;
    if (!eval(condition)) return false;
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionGroupDead = function(members, condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    members = members.toUpperCase();
    if (['TROOP', 'TROOPS', 'ENEMY', 'ENEMIES'].contains(members)) {
      members = $gameTroop.deadMembers();
    } else if (['PARTY', 'PLAYER'].contains(members)) {
      members = $gameParty.deadMembers();
    } else {
      return false;
    }
    if (members.length <= 0) return false;
    condition = 'members.length ' + condition;
    if (!eval(condition)) return false;
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionPartyLevel = function(type, condition) {
    if (type.match(/HIGHEST/i)) {
      condition = '.highestLevel() ' + condition;
    } else if (type.match(/LOWEST/i)) {
      condition = '.lowestLevel() ' + condition;
    } else if (type.match(/AVERAGE/i)) {
      condition = '.averageLevel() ' + condition;
    } else {
      return false;
    }
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    if (action.isForFriend()) {
      condition = 'action.friendsUnit()' + condition;
    } else if (action.isForOpponent()) {
      condition = 'action.opponentsUnit()' + condition;
    }
    if (!eval(condition)) return false;
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionParamEval = function(paramId, condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    condition = condition.replace(/(\d+)([%％])/g, function() {
      return this.convertIntegerPercent(parseInt(arguments[1]));
    }.bind(this));
    if (paramId < 0) return false;
    if (paramId >= 0 && paramId <= 7) {
      condition = 'target.param(paramId) ' + condition;
    } else if (paramId === 8) {
      condition = 'target.hp ' + condition;
    } else if (paramId === 9) {
      condition = 'target.mp ' + condition;
    } else if (paramId === 10) {
      condition = 'target.hp / target.mhp ' + condition;
    } else if (paramId === 11) {
      condition = 'target.mp / target.mmp ' + condition;
    } else if (paramId === 12) {
      condition = 'target.level ' + condition;
    }
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      if (eval(condition)) validTargets.push(target);
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
};

AIManager.conditionRandom = function(rate) {
    if (Math.random() >= rate) return false;
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionStateHas = function(condition) {
    if (condition.match(/STATE[ ](\d+)/i)) {
      var stateId = parseInt(RegExp.$1);
    } else {
      var stateId = Yanfly.StateIdRef[condition.toUpperCase()];
      if (!stateId) return false;
    }
    if (!$dataStates[stateId]) return false;
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      if (target.hasState(stateId)) validTargets.push(target);
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
};

AIManager.conditionStateNot = function(condition) {
    if (condition.match(/STATE[ ](\d+)/i)) {
      var stateId = parseInt(RegExp.$1);
    } else {
      var stateId = Yanfly.StateIdRef[condition.toUpperCase()];
      if (!stateId) return false;
    }
    if (!$dataStates[stateId]) return false;
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      if (target.notState(stateId)) validTargets.push(target);
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
};

AIManager.conditionSwitch = function(switchId, value) {
    if (['ON', 'TRUE', 'YES'].contains(value.toUpperCase())) {
      value = true;
    } else if (['OFF', 'FALSE', 'NO'].contains(value.toUpperCase())) {
      value = false;
    } else {
      return false;
    }
    if ($gameSwitches.value(switchId) !== value) return false;
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionTurnCount = function(condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    if (Imported.YEP_BattleEngineCore) {
      condition = 'user.turnCount() ' + condition;
    } else {
      condition = '$gameTroop.turnCount() ' + condition;
    }
    if (!eval(condition)) return false;
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionVariable = function(variableId, condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    condition = '$gameVariables.value(' + variableId + ') ' + condition;
    if (!eval(condition)) return false;
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

//=============================================================================
// End of File
//=============================================================================
