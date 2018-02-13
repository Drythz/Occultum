//=============================================================================
// Yanfly Engine Plugins - Skill Core
// YEP_SkillCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_SkillCore = true;

var Yanfly = Yanfly || {};
Yanfly.Skill = Yanfly.Skill || {};

//=============================================================================
/*:
 * @plugindesc v1.09 Habilidades são agora dadas mais funções e a
 * capacidade de exigir diferentes tipos de custos.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Cost Padding
 * @desc Se uma habilidade tem custos múltiplos, isso é a quantidade de
 * pixels usada como padding entre os custos.
 * @default 4
 *
 * @param Command Alignment
 * @desc Ajusta o alinhamento de texto da janela de tipo de habilidade.
 * left     center     right
 * @default center
 *
 * @param Window Columns
 * @desc Choose how many columns to use for the skill window.
 * Default: 2
 * @default 2
 *
 * @param ---HP Costs---
 * @default
 *
 * @param HP Format
 * @desc Ajusta a forma que o custo de HP aparece na janela de lista de
 * habilidade. %1 - Cost     %2 - HP
 * @default %1%2
 *
 * @param HP Font Size
 * @desc Ajusta o tamanho da fonte usada para mostrar o HP.
 * Padrão: 28
 * @default 20
 *
 * @param HP Text Color
 * @desc Ajusta a cor de texto usada pelo skin de Janela para HP.
 * Padrão: 21
 * @default 18
 *
 * @param HP Icon
 * @desc Escolhe qual ícone usar para representar os custos de HP.
 * Use 0 se você não quiser usar um ícone.
 * @default 162
 *
 * @param ---MP Costs---
 * @default
 *
 * @param MP Format
 * @desc Ajusta a forma que o custo de MP aparece na janela de lista de
 * habilidade. %1 - Cost     %2 - MP
 * @default %1%2
 *
 * @param MP Font Size
 * @desc Ajusta o tamanho da fonte usado para mostrar o MP.
 * Padrão: 28
 * @default 20
 *
 * @param MP Text Color
 * @desc Ajusta a cor de texto usada pelo skin de Janela para MP.
 * Padrão: 23
 * @default 23
 *
 * @param MP Icon
 * @desc Escolhe qual ícone usar para representar os custos de MP.
 * Use 0 se você não quiser usar um ícone.
 * @default 165
 *
 * @param ---TP Costs---
 * @default
 *
 * @param TP Format
 * @desc Ajusta a forma que o custo de TP aparece na janela de lista de
 * habilidade. %1 - Cost     %2 - TP
 * @default %1%2
 *
 * @param TP Font Size
 * @desc Ajusta o tamanho da fonte usado para mostrar o TP.
 * Padrão: 28
 * @default 20
 *
 * @param TP Text Color
 * @desc Ajusta a cor de texto usada pelo skin de Janela para TP.
 * Padrão: 29
 * @default 29
 *
 * @param TP Icon
 * @desc Escolhe qual ícone usar para representar os custos de TP.
 * Use 0 se você não quiser usar um ícone.
 * @default 164
 *
 * @help
 * ============================================================================
 * Introdução
 * ============================================================================
 *
 * Habilidades em RPG's consistem de três componentes principais: Custos,
 * Dano, e Efeitos. Embora nem todos os componentes sejam exigidos para
 * uma habilidade, eles certamente contribuem para uma grande parte dela.
 * Dano será manuseado por outro plugin, mas esse plugin irá fornecer o
 * manuseio de custos de habilidades e efeitos de habilidades.
 *
 * Esse plugin também inclui a capacidade para combatentes de trocar seus
 * indicadores de HP, MP, e/ou TP para uma coisa diferente se isso irá
 * encaixar ao personagem melhor (por exemplo, algumas classes não usam
 * MP e/ou TP).
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Esses notetags podem ajustar tanto custos de habilidades ou efeitos de
 * habilidades especiais.
 *
 * Notetags de Habilidade:
 *   <HP Cost: x>
 *   Muda a habilidade para ter x como seu custo de HP. O editor do RPG Maker
 *   MV tem em falta funções de custo de HP, então isso permitiria habilidades
 *   a usarem HP como seu custo.
 *
 *   <HP Cost: x%>
 *   Muda a habilidade a custar uma porcentagem do valor de MaxHP do
 *   personagem.
 *
 *   <MP Cost: x>
 *   Muda a habilidade para ter x como seu custo de MP.
 *   Isso ajuda evitar o limite do banco de dados de 9999.
 *
 *   <MP Cost: x%>
 *   Muda a habilidade a custar uma porcentagem do valor de MaxMP do
 *   personagem.
 *
 *   <TP Cost: x>
 *   Muda a habilidade para ter x como seu custo de TP.
 *   Isso ajuda evitar o limite do banco de dados de 99.
 *
 *   <TP Cost: x%>
 *   Muda a habilidade a custar uma porcentagem do valor de MaxMP do
 *   personagem. Embora o MaxTP padrão é 100, esse tag será útil para
 *   quaisquer plugins que irão alterar o valor de MaxTP de um personagem.
 *
 *   <Hide in Battle>
 *   This will hide and disable the skill during battle.
 *
 *   <Hide in Field>
 *   This will hide and disable the skill outside of battle.
 *
 *   <Hide if Learned Skill: x>
 *   <Hide if Learned Skill: x, x, x>
 *   <Hide if Learned Skill: x to y>
 *   Will hide and disable this skill if skill x has been learned. If multiple
 *   skills are listed, the skill will be hidden and disabled if any one of the
 *   listed skills have been learned. This does not apply to skills that are
 *   given by traits.
 *
 * ============================================================================
 * Troca de Indicador
 * ============================================================================
 *
 * Esse plugin também deixa você trocar os indicadores de HP, MP, e TP para
 * qualquer ordem que você quiser assumindo que todos os plugins que você
 * usar terão a mesma de HP, MP e TP e não passe por cima do processo de
 * desenho de indicador padrão. Se você usar quaisquer extensões de plugin,
 * eles também poderão ser trocados.
 *
 * Nota: Se você não tiver 'Display TP in Battle' marcado abaixo do tab System
 * no banco de dados, nada será mostrado no terceiro slot.
 *
 * Notetag de Classe:
 *   <Swap Gauge x: y>
 *   Isso irá mudar o indicador x (1, 2, ou 3) para y. Substitua y como
 *   'HP', 'MP', ou 'TP' para mostrar esse indicador no slot de indicador.
 *   Se você não quiser que o slot mostre alguma coisa, insira 'Nothing' ou
 *   'Null' no lugar de y no notetag.
 *
 * Notetags de Arma, Armadura, e Estado:
 *   <Swap Gauge x: y>
 *   Personagens com equipamentos ou estados que contenham esses notetags ou
 *   inimigos com estados que contenham esses notetags irão mostrar aqueles
 *   indicadores trocados no lugar das configurações padrões ou configurações
 *   definidas pelos notetags de Class ou Enemy.
 *
 *   Prioridade irá acontecer na ordem seguinte:
 *     Armas, Armaduras, Estados, Classes, Inimigo
 *
 * ============================================================================
 * Modo Lunático - Custos de Habilidades
 * ============================================================================
 *
 * Para usuários que queiram mais controle sobre custos de habilidades e
 * efeitos de habilidades, há notetags que permitem você aplicar código
 * para os custos e/ou efeitos de uma habilidade. Para efeitos, isso
 * também irá extender para controle de item também.
 *
 *   <Custom HP Cost>        Exemplo:   <Custom HP Cost>
 *    código                             cost += $gameVariables.value(1);
 *    código                            </Custom HP Cost>
 *   </Custom HP Cost>
 *   Isso permite a habilidade a ter um custo de HP personalizado baseado
 *   do código. Para o pedaço de código, 'cost' é uma variável já pré-definida
 *   com o custo de HP e o custo de percentual de HP.
 *
 *   <Custom MP Cost>       Exemplo:   <Custom MP Cost>
 *    código                            cost += $gameVariables.value(1);
 *    código                           </Custom MP Cost>
 *   </Custom MP Cost>
 *   Isso permite a habilidade a ter um custo de MP personalizado baseado
 *   do código. Para o pedaço de código, 'cost' é uma variável já pré-definida
 *   com o custo de MP e o custo de percentual de MP.
 *
 *   <Custom TP Cost>      Exemplo:   <Custom TP Cost>
 *    código                           cost += $gameVariables.value(1);
 *    código                          </Custom TP Cost>
 *   </Custom TP Cost>
 *   Isso permite a habilidade a ter um custo de TP personalizado baseado
 *   do código. Para o pedaço de código, 'cost' é uma variável já pré-definida
 *   com o custo de TP e o custo de percentual de TP.
 *
 * ============================================================================
 * Modo Lunático - Requisitos Personalizados de Mostrar
 * ============================================================================
 *
 * Para aqueles que queiram mostrar certas habilidades e desabilitá-las
 * sob quaisquer condições personalizadas usando JavaScript, use os
 * seguintes notetags:
 *
 * Notetag de Habilidade:
 *   <Custom Show Eval>
 *   if (user.level > 50) {
 *     visible = true;
 *   } else {
 *     visible = false;
 *   }
 *   </Custom Show Eval>
 *   Se visible for true, a habilidade é mostrada (não escondida) e habilitada
 *   se todas as outras condições forem atendidas. Se visible for false, a
 *   habilidade é desabilitada e escondida da lista.
 *
 * ============================================================================
 * Modo Lunático - Requerimentos Personalizados e Execução
 * ============================================================================
 *
 * Para aqueles com um pouco de experiência em JavaScript, você pode usar
 * os seguintes notetags para restringir uma habilidade e que tipo de
 * código processar quando executando-a.
 *
 * Notetags de Habilidade:
 *
 *   <Custom Requirement>
 *    if ($gameParty.gold() > 1000) {
 *      value = true;
 *    } else {
 *      value = false;
 *    }
 *   </Custom Requirement>
 *   Se value for true, a habilidade poderá ser usada se todos os outros
 *   requisitos forem atendidos. Se value for false, a habilidade não
 *   poderá ser usada.
 *
 *   <Custom Execution>
 *    $gameParty.loseGold(1000);
 *   </Custom Execution>
 *   Isso executa o código dentro dos notetags quando usando a habilidade.
 *
 * ============================================================================
 * Modo Lunático - Exibição de Custo Personalizado
 * ============================================================================
 *
 * Para aqueles com um pouco de experiência em JavaScript, você pode
 * adicionar novas formas de exibir o custo da habilidade.
 *
 * Notetags de Habilidade:
 *
 *   <Cost Display Eval>
 *    var variableId = 1;
 *    var value = 1000;
 *    $gameVariables.setValue(variableId, value);
 *   </Cost Display Eval>
 *   Esse notetag executa um eval antes de exibir o custo da habilidade.
 *   Isso é para você estabelecer variáveis para o texto de exibição do
 *   custo da habilidade.
 *
 *   <Custom Cost Display>
 *    \c[4]\v[1]\c[0] Gold
 *   </Custom Cost Display>
 *   Esse é o texto personalizado exibido antes do resto dos custos de
 *   habilidade. Você pode usar códigos de texto com esse notetag.
 *
 * ============================================================================
 * Modo Lunático - As Fases de Habilidade
 * ============================================================================
 *
 * Para essa habilidade, efeitos múltiplos são aplicados e em fases diferentes.
 * As várias fases são as seguintes:
 *
 *    Antes da Fase de Efeito (influenciado por esse plugin)
 *    se a habilidade acontecer com sucesso:
 *    - Fase de Efeito Pré-Dano  (influenciado por esse plugin)
 *    - Fase de Fano
 *    - Fase de Efeito Pós-Dano (influenciado por esse plugin)
 *    - Fase de Efeito de Traço de Item
 *    Fase Depois do Efeito (influenciado por esse plugin)
 *
 * Há quatro fases que podem ser influenciadas por esse plugin. Duas que
 * não importam se o efeito acontecer com sucesso, e outras duas que
 * importam se o efeito acontecer com sucesso.
 *
 * Notetags de Habilidade e Item:
 *   <Before Eval>    <Pre-Damage Eval>    <Post-Damage Eval>    <After Eval>
 *    código            código               código                código
 *    código            código               código                código
 *   </Before Eval>   </Pre-Damage Eval>   </Post-Damage Eval>   </After Eval>
 *   Se você quiser usar efeitos personalizados para sua habilidade, você
 *   pode inserir suas respectivas notetags no noteboxes da habilidade (ou
 *   item) e ele irá executar o código que aparece entre os tags. Porém,
 *   usar qualquer forma de comentário nesse tag irá bloquear o código
 *   que segue.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.09:
 * - The <Pre-Damage Eval> notetag now has the ability alter damage dealt. The
 * 'value' variable refers to and returns the damage affected by the action.
 *
 * Version 1.08:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.07:
 * - Fixed a bug that prevented immortal actors at 0 HP from using skills.
 *
 * Version 1.06a:
 * - Added <Hide in Battle> and <Hide in Field> notetags.
 * - Added a failsafe to check for undefined skills.
 *
 * Version 1.05:
 * - Added <Hide if Learned Skill: x> notetags.
 * - Added <Custom Show Eval> Lunatic Mode notetag.
 *
 * Version 1.04:
 * - Added four Lunatic Modes notetags: Custom Requirement, Custom Execution,
 * Cost Display Eval, Custom Cost Display.
 *
 * Version 1.03:
 * - Fixed a bug with the Lunatic Mode notetags not working.
 *
 * Version 1.02:
 * - Added 'Window Columns' parameter to let users adjust the number of columns
 * used for the skill window.
 *
 * Version 1.01:
 * - Fixed a mathematical error for skill cost padding.
 * - Added return for drawSkillCost to assist others scripters when making
 * compatibility notes.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_SkillCore');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Param.SCCCostPadding = Number(Yanfly.Parameters['Cost Padding']);
Yanfly.Param.SCCTextAlign = String(Yanfly.Parameters['Command Alignment']);
Yanfly.Param.SCCWindowCol = Number(Yanfly.Parameters['Window Columns']);
Yanfly.Param.SCCTpFormat = String(Yanfly.Parameters['TP Format']);
Yanfly.Param.SCCTpFontSize = Number(Yanfly.Parameters['TP Font Size']);
Yanfly.Param.SCCTpTextColor = Number(Yanfly.Parameters['TP Text Color']);
Yanfly.Icon.Tp = Number(Yanfly.Parameters['TP Icon']);
Yanfly.Param.SCCMpFormat = String(Yanfly.Parameters['MP Format']);
Yanfly.Param.SCCMpFontSize = Number(Yanfly.Parameters['MP Font Size']);
Yanfly.Param.SCCMpTextColor = Number(Yanfly.Parameters['MP Text Color']);
Yanfly.Icon.Mp = Number(Yanfly.Parameters['MP Icon']);
Yanfly.Param.SCCHpFormat = String(Yanfly.Parameters['HP Format']);
Yanfly.Param.SCCHpFontSize = Number(Yanfly.Parameters['HP Font Size']);
Yanfly.Param.SCCHpTextColor = Number(Yanfly.Parameters['HP Text Color']);
Yanfly.Icon.Hp = Number(Yanfly.Parameters['HP Icon']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Skill.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Skill.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_SkillCore) {
    this.processSkillNotetags($dataSkills);
    this.processObjectNotetags($dataSkills);
    this.processObjectNotetags($dataItems);
    this.processGSCNotetags1($dataClasses);
    this.processGSCNotetags1($dataEnemies);
    this.processGSCNotetags2($dataWeapons);
    this.processGSCNotetags2($dataArmors);
    this.processGSCNotetags2($dataStates);
    Yanfly._loaded_YEP_SkillCore = true;
  }
  return true;
};

DataManager.processSkillNotetags = function(group) {
  var note1 = /<(?:MP COST):[ ](\d+)>/i;
  var note2 = /<(?:MP COST):[ ](\d+)([%％])>/i;
  var note3 = /<(?:TP COST):[ ](\d+)>/i;
  var note4 = /<(?:TP COST):[ ](\d+)([%％])>/i;
  var note5 = /<(?:HP COST):[ ](\d+)>/i;
  var note6 = /<(?:HP COST):[ ](\d+)([%％])>/i;
  var note7a = /<(?:HIDE IF LEARNED SKILL):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note7b = /<(?:HIDE IF LEARNED SKILL):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note8a = /<(?:HIDE IN BATTLE|hide during battle)>/i;
  var note8b = /<(?:HIDE IN FIELD|hide during field)>/i;
  var noteMpEval1 = /<(?:MP COST EVAL|custom mp cost)>/i;
  var noteMpEval2 = /<\/(?:MP COST EVAL|custom mp cost)>/i;
  var noteTpEval1 = /<(?:TP COST EVAL|custom tp cost)>/i;
  var noteTpEval2 = /<\/(?:TP COST EVAL|custom tp cost)>/i;
  var noteHpEval1 = /<(?:HP COST EVAL|custom hp cost)>/i;
  var noteHpEval2 = /<\/(?:HP COST EVAL|custom hp cost)>/i;
  var noteEvalReq1 = /<(?:EVAL REQUIREMENT|custom requirement)>/i;
  var noteEvalReq2 = /<\/(?:EVAL REQUIREMENT|custom requirement)>/i;
  var noteEvalExe1 = /<(?:EVAL EXECUTION|custom execution)>/i;
  var noteEvalExe2 = /<\/(?:EVAL EXECUTION|custom execution)>/i;
  var noteCostEval1 = /<(?:COST DISPLAY EVAL|display cost eval)>/i;
  var noteCostEval2 = /<\/(?:COST DISPLAY EVAL|display cost eval)>/i;
  var noteCostText1 = /<(?:CUSTOM COST DISPLAY|custom display cost)>/i;
  var noteCostText2 = /<\/(?:CUSTOM COST DISPLAY|custom display cost)>/i;
  var noteShowEval1 = /<(?:CUSTOM SHOW EVAL)>/i;
  var noteShowEval2 = /<\/(?:CUSTOM SHOW EVAL)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.hpCost = 0;
    obj.hpCostPer = 0.0;
    obj.mpCostPer = 0.0;
    obj.tpCostPer = 0.0;
    obj.hideInBattle = false;
    obj.hideInField = false;
    obj.hideIfLearnedSkill = [];
    var evalMode = 'none';
    obj.hpCostEval = '';
    obj.mpCostEval = '';
    obj.tpCostEval = '';
    obj.requireEval = '';
    obj.executeEval = '';
    obj.costdisplayEval = '';
    obj.costShowEval = '';
    obj.customCostText = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.mpCost = parseInt(RegExp.$1);
      } else if (line.match(note2)) {
        obj.mpCostPer = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(note3)) {
        obj.tpCost = parseInt(RegExp.$1);
      } else if (line.match(note4)) {
        obj.tpCostPer = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(note5)) {
        obj.hpCost = parseInt(RegExp.$1);
      } else if (line.match(note6)) {
        obj.hpCostPer = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(note7a)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.hideIfLearnedSkill = obj.hideIfLearnedSkill.concat(array);
      } else if (line.match(note7b)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.hideIfLearnedSkill = obj.hideIfLearnedSkill.concat(range);
      } else if (line.match(note8a)) {
        obj.hideInBattle = true;
      } else if (line.match(note8b)) {
        obj.hideInField = true;
      } else if (line.match(noteMpEval1)) {
        evalMode = 'mp';
      } else if (line.match(noteMpEval2)) {
        evalMode = 'none';
      } else if (line.match(noteTpEval1)) {
        evalMode = 'tp';
      } else if (line.match(noteTpEval2)) {
        evalMode = 'none';
      } else if (line.match(noteHpEval1)) {
        evalMode = 'hp';
      } else if (line.match(noteHpEval2)) {
        evalMode = 'none';
      } else if (line.match(noteEvalReq1)) {
        evalMode = 'custom requirement';
      } else if (line.match(noteEvalReq2)) {
        evalMode = 'none';
      } else if (line.match(noteEvalExe1)) {
        evalMode = 'custom execute';
      } else if (line.match(noteEvalExe2)) {
        evalMode = 'none';
      } else if (line.match(noteCostEval1)) {
        evalMode = 'display cost eval';
      } else if (line.match(noteCostEval2)) {
        evalMode = 'none';
      } else if (line.match(noteCostText1)) {
        evalMode = 'custom display cost';
      } else if (line.match(noteCostText2)) {
        evalMode = 'none';
      } else if (line.match(noteShowEval1)) {
        evalMode = 'custom show eval';
      } else if (line.match(noteShowEval2)) {
        evalMode = 'none';
      } else if (evalMode === 'mp') {
        obj.mpCostEval = obj.mpCostEval + line + '\n';
      } else if (evalMode === 'tp') {
        obj.tpCostEval = obj.tpCostEval + line + '\n';
      } else if (evalMode === 'hp') {
        obj.hpCostEval = obj.hpCostEval + line + '\n';
      } else if (evalMode === 'custom requirement') {
        obj.requireEval = obj.requireEval + line + '\n';
      } else if (evalMode === 'custom execute') {
        obj.executeEval = obj.executeEval + line + '\n';
      } else if (evalMode === 'display cost eval') {
        obj.costdisplayEval = obj.costdisplayEval + line + '\n';
      } else if (evalMode === 'custom display cost') {
        obj.customCostText = obj.customCostText + line;
      } else if (evalMode === 'custom show eval') {
        obj.costShowEval = obj.costShowEval + line + '\n';
      }
    }
  }
};

DataManager.processObjectNotetags = function(group) {
  var note1 = /<(?:BEFORE EVAL)>/i;
  var note2 = /<\/(?:BEFORE EVAL)>/i;
  var note3 = /<(?:PRE-DAMAGE EVAL)>/i;
  var note4 = /<\/(?:PRE-DAMAGE EVAL)>/i;
  var note5 = /<(?:POST-DAMAGE EVAL)>/i;
  var note6 = /<\/(?:POST-DAMAGE EVAL)>/i;
  var note7 = /<(?:AFTER EVAL)>/i;
  var note8 = /<\/(?:AFTER EVAL)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    var customMode = 'none';
    obj.customBeforeEval = '';
    obj.customPreDamageEval = '';
    obj.customPostDamageEval = '';
    obj.customAfterEval = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        customMode = 'before';
      } else if (line.match(note2)) {
        customMode = 'none';
      } else if (line.match(note3)) {
        customMode = 'pre-damage';
      } else if (line.match(note4)) {
        customMode = 'none';
      } else if (line.match(note5)) {
        customMode = 'post-damage';
      } else if (line.match(note6)) {
        customMode = 'none';
      } else if (line.match(note7)) {
        customMode = 'after';
      } else if (line.match(note8)) {
        customMode = 'none';
      } else if (customMode === 'before') {
        obj.customBeforeEval = obj.customBeforeEval + line + '\n';
      } else if (customMode === 'pre-damage') {
        obj.customPreDamageEval = obj.customPreDamageEval + line + '\n';
      } else if (customMode === 'post-damage') {
        obj.customPostDamageEval = obj.customPostDamageEval + line + '\n';
      } else if (customMode === 'after') {
        obj.customAfterEval = obj.customAfterEval + line + '\n';
      }
    }
  }
};

DataManager.processGSCNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.gauge1 = 'HP';
    obj.gauge2 = 'MP';
    obj.gauge3 = 'TP';

    obj.gaugeIcon1 = 0;
    obj.gaugeIcon2 = 0;
    obj.gaugeIcon3 = 0;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:SWAP GAUGE|gauge)[ ](\d+):[ ](.*)>/i)) {
        var gauge = parseInt(RegExp.$1);
        var text = String(RegExp.$2).toUpperCase();
        if (['HP', 'MP', 'TP', 'NOTHING', 'NULL'].contains(text)) {
          if (gauge === 1) obj.gauge1 = text;
          if (gauge === 2) obj.gauge2 = text;
          if (gauge === 3) obj.gauge3 = text;
        }
      }
    }
  }
};

DataManager.processGSCNotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.gauge1 = 'UNDEFINED';
    obj.gauge2 = 'UNDEFINED';
    obj.gauge3 = 'UNDEFINED';

    obj.gaugeIcon1 = 'UNDEFINED';
    obj.gaugeIcon2 = 'UNDEFINED';
    obj.gaugeIcon3 = 'UNDEFINED';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:SWAP GAUGE|gauge)[ ](\d+):[ ](.*)>/i)) {
        var gauge = parseInt(RegExp.$1);
        var text = String(RegExp.$2).toUpperCase();
        if (['HP', 'MP', 'TP', 'NOTHING', 'NULL'].contains(text)) {
          if (gauge === 1) obj.gauge1 = text;
          if (gauge === 2) obj.gauge2 = text;
          if (gauge === 3) obj.gauge3 = text;
        }
      }
    }
  }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.Skill.Game_BattlerBase_mSC =
    Game_BattlerBase.prototype.meetsSkillConditions;
Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
    if (!Yanfly.Skill.Game_BattlerBase_mSC.call(this, skill)) return false;
    if (!skill) return false;
    if (!this.noHiddenSkillConditionsMet(skill)) return false;
    return this.meetsSkillConditionsEval(skill);
};

Game_BattlerBase.prototype.noHiddenSkillConditionsMet = function(skill) {
    if (!skill) return false;
    if (this.isEnemy()) return true;
    if (skill.hideIfLearnedSkill) {
      for (var i = 0; i < skill.hideIfLearnedSkill.length; ++i) {
        var skillId = skill.hideIfLearnedSkill[i];
        if (this.isLearnedSkill(skillId)) return false;
      }
    }
    if (skill.hideInBattle && $gameParty.inBattle()) return false;
    if (skill.hideInField && !$gameParty.inBattle()) return false;
    if (!this.meetsCustomShowEval(skill)) return false;
    return true;
};

Game_BattlerBase.prototype.meetsCustomShowEval = function(skill) {
    if (skill.costShowEval === '') return true;
    var visible = true;
    var item = skill;
    var a = this;
    var user = this;
    var subject = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(skill.costShowEval);
    return visible;
};

Game_BattlerBase.prototype.meetsSkillConditionsEval = function(skill) {
    if (skill.requireEval === '') return true;
    var value = true;
    var item = skill;
    var a = this;
    var user = this;
    var subject = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(skill.requireEval);
    return value;
};

Game_BattlerBase.prototype.skillHpCost = function(skill) {
  var cost = skill.hpCost;
  var item = skill;
  var a = this;
  var user = this;
  var subject = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  cost += this.mhp * skill.hpCostPer;
  eval(skill.hpCostEval);
  return Math.max(0, Math.floor(cost));
};

Game_BattlerBase.prototype.skillMpCost = function(skill) {
  var cost = skill.mpCost;
  var item = skill;
  var a = this;
  var user = this;
  var subject = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  cost += this.mmp * skill.mpCostPer;
  eval(skill.mpCostEval);
  return Math.max(0, Math.floor(cost * this.mcr));
};

Game_BattlerBase.prototype.skillTpCost = function(skill) {
  var cost = skill.tpCost;
  var item = skill;
  var a = this;
  var user = this;
  var subject = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  cost += this.maxTp() * skill.tpCostPer;
  eval(skill.tpCostEval);
  return Math.max(0, Math.floor(cost));
};

Yanfly.Skill.Game_BattlerBase_canPaySkillCost =
    Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
    if (!this.canPaySkillHpCost(skill)) return false;
    return Yanfly.Skill.Game_BattlerBase_canPaySkillCost.call(this, skill);
};

Game_BattlerBase.prototype.canPaySkillHpCost = function(skill) {
    var cost = this.skillHpCost(skill);
    if (cost <= 0) return true;
    return this._hp > cost;
};

Yanfly.Skill.Game_BattlerBase_paySkillCost =
    Game_BattlerBase.prototype.paySkillCost
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    Yanfly.Skill.Game_BattlerBase_paySkillCost.call(this, skill);
    this.paySkillHpCost(skill);
    this.paySkillEvalCost(skill);
};

Game_BattlerBase.prototype.paySkillHpCost = function(skill) {
    this._hp -= this.skillHpCost(skill);
};

Game_BattlerBase.prototype.paySkillEvalCost = function(skill) {
    if (skill.executeEval === '') return;
    var item = skill;
    var a = this;
    var user = this;
    var subject = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(skill.executeEval);
};

Game_BattlerBase.prototype.gauge1 = function() {
    return 'HP';
};

Game_BattlerBase.prototype.gauge2 = function() {
    return 'MP';
};

Game_BattlerBase.prototype.gauge3 = function() {
    return 'TP';
};

Game_BattlerBase.prototype.gaugeIcon1 = function() {
    return 0;
};

Game_BattlerBase.prototype.gaugeIcon2 = function() {
    return 0;
};

Game_BattlerBase.prototype.gaugeIcon3 = function() {
    return 0;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.gauge1 = function() {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.gauge1 === 'UNDEFINED') continue;
      return equip.gauge1;
    }
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gauge1 === 'UNDEFINED') continue;
      return state.gauge1;
    }
    return this.currentClass().gauge1;
};

Game_Actor.prototype.gauge2 = function() {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.gauge2 === 'UNDEFINED') continue;
      return equip.gauge2;
    }
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gauge2 === 'UNDEFINED') continue;
      return state.gauge2;
    }
    return this.currentClass().gauge2;
};

Game_Actor.prototype.gauge3 = function() {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.gauge3 === 'UNDEFINED') continue;
      return equip.gauge3;
    }
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gauge3 === 'UNDEFINED') continue;
      return state.gauge3;
    }
    return this.currentClass().gauge3;
};

Game_Actor.prototype.gaugeIcon1 = function() {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.gaugeIcon1 === 'UNDEFINED') continue;
      return equip.gaugeIcon1;
    }
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gaugeIcon1 === 'UNDEFINED') continue;
      return state.gaugeIcon1;
    }
    return this.currentClass().gaugeIcon1;
};

Game_Actor.prototype.gaugeIcon2 = function() {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.gaugeIcon2 === 'UNDEFINED') continue;
      return equip.gaugeIcon2;
    }
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gaugeIcon2 === 'UNDEFINED') continue;
      return state.gaugeIcon2;
    }
    return this.currentClass().gaugeIcon2;
};

Game_Actor.prototype.gaugeIcon3 = function() {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.gaugeIcon3 === 'UNDEFINED') continue;
      return equip.gaugeIcon3;
    }
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gaugeIcon3 === 'UNDEFINED') continue;
      return state.gaugeIcon3;
    }
    return this.currentClass().gaugeIcon3;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.gauge1 = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gauge1 === 'UNDEFINED') continue;
      return state.gauge1;
    }
    return this.enemy().gauge1;
};

Game_Enemy.prototype.gauge2 = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gauge2 === 'UNDEFINED') continue;
      return state.gauge2;
    }
    return this.enemy().gauge2;
};

Game_Enemy.prototype.gauge3 = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gauge1 === 'UNDEFINED') continue;
      return state.gauge1;
    }
    return this.enemy().gauge3;
};

Game_Enemy.prototype.gaugeIcon1 = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gaugeIcon1 === 'UNDEFINED') continue;
      return state.gaugeIcon1;
    }
    return this.enemy().gaugeIcon1;
};

Game_Enemy.prototype.gaugeIcon2 = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gaugeIcon2 === 'UNDEFINED') continue;
      return state.gaugeIcon2;
    }
    return this.enemy().gaugeIcon2;
};

Game_Enemy.prototype.gaugeIcon3 = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gaugeIcon3 === 'UNDEFINED') continue;
      return state.gaugeIcon3;
    }
    return this.enemy().gaugeIcon3;
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.Skill.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    this.applyBeforeEffect(target);
    this.applyBeforeEval(target);
    Yanfly.Skill.Game_Action_apply.call(this, target);
    this.applyAfterEffect(target);
    this.applyAfterEval(target);
};

Game_Action.prototype.applyBeforeEffect = function(target) {
};

Game_Action.prototype.applyBeforeEval = function(target) {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(item.customBeforeEval);
};

Game_Action.prototype.applyAfterEffect = function(target) {
};

Game_Action.prototype.applyAfterEval = function(target) {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(item.customAfterEval);
};

Yanfly.Skill.Game_Action_executeDamage = Game_Action.prototype.executeDamage;
Game_Action.prototype.executeDamage = function(target, value) {
    this.applyPreDamageEffect(target, value);
    value = this.applyPreDamageEval(target, value);
    Yanfly.Skill.Game_Action_executeDamage.call(this, target, value);
    this.applyPostDamageEffect(target, value);
    this.applyPostDamageEval(target, value);
};

Game_Action.prototype.applyPreDamageEffect = function(target, value) {
};

Game_Action.prototype.applyPreDamageEval = function(target, value) {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(item.customPreDamageEval);
    return value;
};

Game_Action.prototype.applyPostDamageEffect = function(target, value) {
};

Game_Action.prototype.applyPostDamageEval = function(target, value) {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(item.customPostDamageEval);
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.Skill.Window_Base_drawActorHp = Window_Base.prototype.drawActorHp;
Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
    if (actor.gauge1() === 'HP') {
      Yanfly.Skill.Window_Base_drawActorHp.call(this, actor, x, y, width);
    } else if (actor.gauge1() === 'MP') {
      Yanfly.Skill.Window_Base_drawActorMp.call(this, actor, x, y, width);
    } else if (actor.gauge1() === 'TP') {
      Yanfly.Skill.Window_Base_drawActorTp.call(this, actor, x, y, width);
    }
};

Yanfly.Skill.Window_Base_drawActorMp = Window_Base.prototype.drawActorMp;
Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
    if (actor.gauge2() === 'HP') {
      Yanfly.Skill.Window_Base_drawActorHp.call(this, actor, x, y, width);
    } else if (actor.gauge2() === 'MP') {
      Yanfly.Skill.Window_Base_drawActorMp.call(this, actor, x, y, width);
    } else if (actor.gauge2() === 'TP') {
      Yanfly.Skill.Window_Base_drawActorTp.call(this, actor, x, y, width);
    }
};

Yanfly.Skill.Window_Base_drawActorTp = Window_Base.prototype.drawActorTp;
Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
    if (actor.gauge3() === 'HP') {
      Yanfly.Skill.Window_Base_drawActorHp.call(this, actor, x, y, width);
    } else if (actor.gauge3() === 'MP') {
      Yanfly.Skill.Window_Base_drawActorMp.call(this, actor, x, y, width);
    } else if (actor.gauge3() === 'TP') {
      Yanfly.Skill.Window_Base_drawActorTp.call(this, actor, x, y, width);
    }
};

//=============================================================================
// Window_SkillType
//=============================================================================

Window_SkillType.prototype.itemTextAlign = function() {
    return Yanfly.Param.SCCTextAlign;
};

//=============================================================================
// Window_SkillList
//=============================================================================

Window_SkillList.prototype.maxCols = function() {
    return Yanfly.Param.SCCWindowCol;
};

Yanfly.Skill.Window_SkillList_includes =
    Window_SkillList.prototype.includes;
Window_SkillList.prototype.includes = function(item) {
    if (this._actor) {
      if (!this._actor.noHiddenSkillConditionsMet(item)) return false;
    }
    return Yanfly.Skill.Window_SkillList_includes.call(this, item);
};

Window_SkillList.prototype.drawSkillCost = function(skill, wx, wy, width) {
    var dw = width;
    dw = this.drawTpCost(skill, wx, wy, dw);
    dw = this.drawMpCost(skill, wx, wy, dw);
    dw = this.drawHpCost(skill, wx, wy, dw);
    dw = this.drawCustomDisplayCost(skill, wx, wy, dw);
    dw = this.drawOtherCost(skill, wx, wy, dw);
    return dw;
};

Window_SkillList.prototype.drawTpCost = function(skill, wx, wy, dw) {
    if (this._actor.skillTpCost(skill) <= 0) return dw;
    if (Yanfly.Icon.Tp > 0) {
      var iw = wx + dw - Window_Base._iconWidth;
      this.drawIcon(Yanfly.Icon.Tp, iw, wy + 2);
      dw -= Window_Base._iconWidth + 2;
    }
    this.changeTextColor(this.textColor(Yanfly.Param.SCCTpTextColor));
    var fmt = Yanfly.Param.SCCTpFormat;
    var text = fmt.format(Yanfly.Util.toGroup(this._actor.skillTpCost(skill)),
      TextManager.tpA);
    this.contents.fontSize = Yanfly.Param.SCCTpFontSize;
    this.drawText(text, wx, wy, dw, 'right');
    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

Window_SkillList.prototype.drawMpCost = function(skill, wx, wy, dw) {
    if (this._actor.skillMpCost(skill) <= 0) return dw;
    if (Yanfly.Icon.Mp > 0) {
      var iw = wx + dw - Window_Base._iconWidth;
      this.drawIcon(Yanfly.Icon.Mp, iw, wy + 2);
      dw -= Window_Base._iconWidth + 2;
    }
    this.changeTextColor(this.textColor(Yanfly.Param.SCCMpTextColor));
    var fmt = Yanfly.Param.SCCMpFormat;
    var text = fmt.format(Yanfly.Util.toGroup(this._actor.skillMpCost(skill)),
      TextManager.mpA);
    this.contents.fontSize = Yanfly.Param.SCCMpFontSize;
    this.drawText(text, wx, wy, dw, 'right');
    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

Window_SkillList.prototype.drawHpCost = function(skill, wx, wy, dw) {
    if (this._actor.skillHpCost(skill) <= 0) return dw;
    if (Yanfly.Icon.Hp > 0) {
      var iw = wx + dw - Window_Base._iconWidth;
      this.drawIcon(Yanfly.Icon.Hp, iw, wy + 2);
      dw -= Window_Base._iconWidth + 2;
    }
    this.changeTextColor(this.textColor(Yanfly.Param.SCCHpTextColor));
    var fmt = Yanfly.Param.SCCHpFormat;
    var text = fmt.format(Yanfly.Util.toGroup(this._actor.skillHpCost(skill)),
      TextManager.hpA);
    this.contents.fontSize = Yanfly.Param.SCCHpFontSize;
    this.drawText(text, wx, wy, dw, 'right');
    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

Window_SkillList.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Window_SkillList.prototype.drawCustomDisplayCost = function(skill, wx, wy, dw) {
    this.runDisplayEvalCost(skill);
    if (skill.customCostText === '') return dw;
    var width = this.textWidthEx(skill.customCostText);
    this.drawTextEx(skill.customCostText, wx - width + dw, wy);
    var returnWidth = dw - width - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

Window_SkillList.prototype.runDisplayEvalCost = function(skill) {
    if (skill.costdisplayEval === '') return;
    var item = skill;
    var a = this._actor;
    var user = this._actor;
    var subject = this._actor;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(skill.costdisplayEval);
};

Window_SkillList.prototype.drawOtherCost = function(skill, wx, wy, dw) {
    return dw;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function(inVal) {
        return inVal;
    }
};

//=============================================================================
// End of File
//=============================================================================
