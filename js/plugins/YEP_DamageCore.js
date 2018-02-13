//=============================================================================
// Yanfly Engine Plugins - Damage Core
// YEP_DamageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_DamageCore = true;

var Yanfly = Yanfly || {};
Yanfly.DMG = Yanfly.DMG || {};

//=============================================================================
 /*:
 * @plugindesc v1.02 Aumente o controle que você tem sobre a calculação
 * de dano do jogo com mais características e efeitos.
 * @author Yanfly Engine Plugins
 *
 * @param ---Damage Cap---
 * @default
 *
 * @param Enable Cap
 * @desc Você quer por um limite máximo no seu dano?
 * NÃO - false     SIM - true     Padrão: false
 * @default true
 *
 * @param Maximum Damage
 * @desc Se habilitado, qual é o dano máximo padrão?
 * @default 9999
 *
 * @param Maximum Healing
 * @desc Se habilitado, qual é a cura máxima padrão?
 * @default 9999
 *
 * @param ---Damage Steps---
 * @default
 *
 * @param Damage Step 1
 * @desc Essa é a etapa depois que o valor base foi calculado.
 * Previous line: baseDamage = this.evalDamageFormula(target);
 * @default value = baseDamage;
 *
 * @param Damage Step 2
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default critical = this.modifyCritical(critical, baseDamage, target);
 *
 * @param Damage Step 3
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default target.result().critical = critical;
 *
 * @param Damage Step 4
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default baseDamage = this.modifyBaseDamage(value, baseDamage, target);
 *
 * @param Damage Step 5
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default value *= this.calcElementRate(target);
 *
 * @param Damage Step 6
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 7
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 8
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 9
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 10
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default if (baseDamage > 0) {
 *
 * @param Damage Step 11
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default value = this.applyDamageRate(value, baseDamage, target);
 *
 * @param Damage Step 12
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 13
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 14
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 15
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 16
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 17
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 18
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default }
 *
 * @param Damage Step 19
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 20
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default if (baseDamage < 0) {
 *
 * @param Damage Step 21
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default value = this.applyHealRate(value, baseDamage, target);
 *
 * @param Damage Step 22
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 23
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 24
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 25
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 26
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 27
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 28
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default }
 *
 * @param Damage Step 29
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 30
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default if (critical) {
 *
 * @param Damage Step 31
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default value = this.applyCriticalRate(value, baseDamage, target);
 *
 * @param Damage Step 32
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 33
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 34
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 35
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 36
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 37
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 38
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default }
 *
 * @param Damage Step 39
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 40
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default if (this.isPhysical()) {
 *
 * @param Damage Step 41
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default value = this.applyPhysicalRate(value, baseDamage, target);
 *
 * @param Damage Step 42
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 43
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 44
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 45
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 46
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 47
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default value = this.applyFlatPhysical(value, baseDamage, target);
 *
 * @param Damage Step 48
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default }
 *
 * @param Damage Step 49
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 50
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default if (this.isMagical()) {
 *
 * @param Damage Step 51
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default value = this.applyMagicalRate(value, baseDamage, target);
 *
 * @param Damage Step 52
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 53
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 54
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 55
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 56
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 57
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default value = this.applyFlatMagical(value, baseDamage, target);
 *
 * @param Damage Step 58
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default }
 *
 * @param Damage Step 59
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 60
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default if (baseDamage > 0) {
 *
 * @param Damage Step 61
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default value = this.applyFlatDamage(value, baseDamage, target);
 *
 * @param Damage Step 62
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 63
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 64
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 65
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 66
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 67
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 68
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default }
 *
 * @param Damage Step 69
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 70
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default if (baseDamage < 0) {
 *
 * @param Damage Step 71
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default value = this.applyFlatHeal(value, baseDamage, target);
 *
 * @param Damage Step 72
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 73
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 74
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 75
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 76
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 77
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 78
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default }
 *
 * @param Damage Step 79
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 80
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default if (critical) {
 *
 * @param Damage Step 81
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default value = this.applyFlatCritical(value, baseDamage, target);
 *
 * @param Damage Step 82
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 83
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 84
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 85
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 86
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 87
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 88
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default }
 *
 * @param Damage Step 89
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 90
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default value = this.applyVariance(value, item.damage.variance);
 *
 * @param Damage Step 91
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 92
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 93
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 94
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 95
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default value = this.applyGuard(value, target);
 *
 * @param Damage Step 96
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 97
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 98
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default
 *
 * @param Damage Step 99
 * @desc Essa é a próxima etapa no fluxo de dano.
 * @default value = this.applyFlatGlobal(value, baseDamage, target);
 *
 * @param Damage Step 100
 * @desc Essa é a etapa final no fluxo de dano.
 * Following line: return Math.round(value);
 * @default value = this.applyMinimumDamage(value, baseDamage, target);
 *
 * @help
 * ============================================================================
 * Introdução
 * ============================================================================
 *
 * O jogo dá muito controle sobre a fórmula de dano, mas ele não dá muito
 * controle para todo o resto depois de calculá-la. Esse plugin irá dar a você
 * controle sobre a ordem em que a fórmula de dano é calculada e permitir que
 * você insira suas próprias mudanças à ela para o que você quiser.
 *
 * Se você tem YEP_BattleEngineCore.js instalado, coloque o plugin abaixo do
 * YEP_BattleEngineCore.js se você quiser fazer uso dos aspectos extras que
 * esse plugin tem a oferecer.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Aqui estão alguns notegas que você pode usar para modificar os limites de
 * dano.
 *
 * Notetag de Habilidade e Item:
 *   <Bypass Damage Cap>
 *   Isso causa a habilidade/item a ignorar o limite de dano e ir para o valor
 *   regular do dano calculado. Isso irá cancelar quaisquer efeitos de limite
 *   de dano. Isso irá ter prioridade sobre quaisquer efeitos de terminar
 *   o limite de dano.
 *
 * Notetags de Personagem, Classe, Inimigo, Arma, Armadura, e Estado:
 *   <Bypass Damage Cap>
 *   Isso irá causar o combatente relacionado a ignorar quaisquer efeitos de
 *   limite de dano e suas habilidades/itens irão para o valor calculado sem
 *   o limite.
 *
 *   <Damage Cap: x>
 *   <Heal Cap: x>
 *   Isso irá estabelecer a habilidade a ter um limite de dano/cura de x. Isso
 *   irá cancelar qualquer ignoração de limite de dano. Se um combatente
 *   tem mais de um limite de dano, ele irá para o valor maior. Isso quer dizer
 *   que se um personagem tem um arma que traz o limite de dano para 99,999
 *   e um acessório que traz o limite de dano para 999,999, então o limite de
 *   dano do combatente será o valor maior de 999,999.
 *
 * ============================================================================
 * Comandos de Plugin
 * ============================================================================
 *
 * Aqui estão plugins que você pode usar para estabelecer as regras de limite
 * de dano para seu jogo. Tenha em mente que aspectos individuais como marcas
 * de equipamento, propriedades de habilidades, etc. irão ter prioridade sobre
 * os limites padrões.
 *
 * Comando de Plugin:
 *   SetDamageCap 9999     Estabelece o limite de dano padrão para 9999.
 *   SetHealingCap 9999    Estabelece o limite de cura padrão para 9999.
 *   EnableDamageCap       Habilita limite padrão para dano e cura.
 *   DisableDamageCap      Desabilita limite padrão para dano e cura.
 *
 * ============================================================================
 * Modo Lunático - Fórmula de Dano
 * ============================================================================
 *
 * Para aqueles que acham que a caixa de fórmula de dano é muito pequena e
 * querem usar o notebox em vez disso para declarar a fórmula de dano, você
 * pode usar os notetags abaixo:
 *
 * Notetags de Habilidade e Item:
 *   <damage formula>
 *    value = 500;
 *    value += 2500;
 *   </damage formula>
 *   Isso irá sobrescrever a fórmula de dano achada no topo e usar os strings
 *   no meio da fórmula em vez disso. Tenha em mente que usar comentários aqui
 *   irá cancelar qualquer coisa adiante. Novas variáveis podem ser usadas,
 *   também, para fazer calculações de dano mais fáceis.
 *
 *   value   - Refere-se à quantidade que vai ser o valor do dano base.
 *   user    - Refere-se ao personagem/inimigo usando a habilidade/item.
 *   subject - Refere-se ao personagem/inimigo usando a habilidade/item.
 *   target  - Refere-se ao personagem/inimigo alvo no recebimento da
 *             habilidade/item.
 *
 * ============================================================================
 * Modo Lunático - Etapas de Dano
 * ============================================================================
 *
 * A fórmula de dano não é tudo que há para calcular o dano que aparece bem
 * no final. Perto da parte de baixo dos parâmetros desse plugin, você vai
 * ver uma lista grande de Damage Steps. Cada uma dessas etapas é uma linha
 * de código que a contagem de dano passa por ela com o intuito de calcular e
 * finalizar a saída de dano.
 *
 * O propósito daqueles parâmetros é permitir você fácil acesso em onde você
 * quer inserir o código que é seu próprio ou código personalizado
 * disponibilizado por outro plugin. Aqui está uma rápida referência em como
 * o fluxo de dano original parecia:
 *
 * Game_Action.prototype.makeDamageValue = function(target, critical) {
 *     var item = this.item();
 *     var baseDamage = this.evalDamageFormula(target);
 *     var value = baseDamage * this.calcElementRate(target);
 *     if (this.isPhysical()) {
 *         value *= target.pdr;
 *     }
 *     if (this.isMagical()) {
 *         value *= target.mdr;
 *     }
 *     if (baseDamage < 0) {
 *         value *= target.rec;
 *     }
 *     if (critical) {
 *         value = this.applyCritical(value);
 *     }
 *     value = this.applyVariance(value, item.damage.variance);
 *     value = this.applyGuard(value, target);
 *     value = Math.round(value);
 *     return value;
 * };
 *
 * Para deixar tudo organizado, as seguintes linhas foram incorporadas em
 * novas funções:
 *
 * Fórmula                               Nova Função
 *   value *= target.pdr                   value = this.applyPhysicalRate
 *   value *= target.mdr                   value = this.applyMagicalRate
 *   value *= target.rec                   value = this.applyHealRate
 *   value = this.applyCritical(value)     value = this.applyCriticalRate
 *
 * ============================================================================
 * Extensão do Mecanismo de Batalha - Comandos de Sequência de Ações
 * ============================================================================
 *
 * Se você tem YEP_BattleEngineCore.js instalado com esse plugin localizado
 * abaixo dele no gerenciador de plugins, você pode fazer uso dessas
 * sequências de ações extras relacionadas ao dano.
 *
 *=============================================================================
 * BYPASS DAMAGE CAP
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso irá sobrepor todos os limites de dano. Isso também é aplicado à cura.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: bypass damage cap
 *=============================================================================
 *
 *=============================================================================
 * DAMAGE CAP: x
 * HEALING CAP: x
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso estabelece o limite de dano da ação para x, sobrepondo todos os limites
 * acima do dano em jogo menos ele mesmo. Isso também é aplicado à cura.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: damage cap: 999
 *                 healing cap: 999999
 *=============================================================================
 *
 *=============================================================================
 * DAMAGE RATE: x%
 * DAMAGE RATE: x.y
 * DAMAGE RATE: VARIABLE x
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso muda a taxa de dano para todos os tipos de dano (físico, mágico, e tipo
 * de hit). A taxa de dano é resetada no final de cada sequência de ação. Se
 * você usar uma variável, ela é tratada como uma porcentagem.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: damage rate: 50%
 *                 damage rate: 8.667
 *                 damage rate: variable 3
 *=============================================================================
 *
 *=============================================================================
 * FLAT DAMAGE: +x
 * FLAT DAMAGE: -x
 * FLAT DAMAGE: VARIABLE x
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso adiciona um dano fixo para todos os tipos de dano (físico, mágico, e
 * tipo de hit). O dano fixo é resetado no final de cada sequência de ação. Se
 * você usar uma variável, ela é adicionada ao dano.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: flat damage: +100
 *                 flat damage: -250
 *                 flat damage: variable 3
 *=============================================================================
 *
 *=============================================================================
 * FLAT GLOBAL: +x
 * FLAT GLOBAL: -x
 * FLAT GLOBAL: VARIABLE x
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso adiciona um dano global e cura fixos para todos os tipos de dano
 * (físico, mágico, e tipo de hit). O dano fixo e cura são resetados no final
 * de cada sequência de ação. Se você usar uma variável, ela é adicionada ao
 * dano e cura.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: flat global: +100
 *                 flat global: -250
 *                 flat global: variable 3
 *=============================================================================
 *
 *=============================================================================
 * FLAT HEAL: +x
 * FLAT HEAL: -x
 * FLAT HEAL: VARIABLE x
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso adiciona uma cura fixa para todos os tipos de dano (físico, mágico, e
 * tipo de hit). A cura fixa é resetada no final de cada sequência de ação. Se
 * você usar uma variável, ela é adicionada à cura.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: flat heal: +100
 *                 flat heal: -250
 *                 flat heal: variable 3
 *=============================================================================
 *
 *=============================================================================
 * GLOBAL RATE: x%
 * GLOBAL RATE: x.y
 * GLOBAL RATE: VARIABLE x
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso muda as taxas de dano e cura para todos os tipos de dano (físico,
 * mágico, e tipo de hit). As taxas de dano e cura são resetadas no final de
 * cada sequência de ação. Se você usar uma variável, ela é tratada como uma
 * porcentagem.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: global rate: 50%
 *                 global rate: 8.667
 *                 global rate: variable 3
 *=============================================================================
 *
 *=============================================================================
 * HEAL RATE: x%
 * HEAL RATE: x.y
 * HEAL RATE: VARIABLE x
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso muda a taxa de cura para todos os tipos de dano (físico, mágico, e tipo
 * de hit). A taxa de cura é resetada no final de cada sequência de ação. Se
 * você usar uma variável, ela é tratada como uma porcentagem.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: heal rate: 50%
 *                 heal rate: 8.667
 *                 heal rate: variable 3
 *=============================================================================
 *
 *=============================================================================
 * RESET DAMAGE CAP
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso irá resetar o limite de dano implementado pela sequência de ação
 * Damage Cap. Isso também irá resetar os efeitos da sequência de ação Bypass
 * Damage Cap.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: reset damage cap
 *=============================================================================
 *
 *=============================================================================
 * RESET DAMAGE MODIFIERS
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso irá causar todos os modificadores de dano e cura causados por
 * sequências de ações a serem resetados. Enquanto eles normalmente resetam
 * no final de cada sequência de ação, isso irá permitir que você o faça
 * manualmente.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: reset damage modifiers
 *=============================================================================
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Updated for RPG Maker MV version 1.1.0.
 * - <Damage Formula> notetag now supports comments.
 *
 * Version 1.01:
 * - Fixed a bug with <Damage Formula> not recording custom formulas correctly.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_DamageCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.DMGEnableCap = eval(String(Yanfly.Parameters['Enable Cap']));
Yanfly.Param.DMGMaxDamage = Number(Yanfly.Parameters['Maximum Damage']);
Yanfly.Param.DMGMaxHealing = Number(Yanfly.Parameters['Maximum Healing']);
Yanfly.DMG.DamageFlow = '';
for (Yanfly.i = 1; Yanfly.i <= 100; ++Yanfly.i) {
  Yanfly.line = "String(Yanfly.Parameters['Damage Step " +
    Yanfly.i + "'] || '')";
  Yanfly.DMG.DamageFlow = Yanfly.DMG.DamageFlow + eval(Yanfly.line) + '\n';
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.DMG.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.DMG.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!Yanfly._loaded_YEP_DamageCore) {
      this.processDMGNotetags1($dataSkills);
      this.processDMGNotetags1($dataItems);
      this.processDMGNotetags2($dataActors);
      this.processDMGNotetags2($dataClasses);
      this.processDMGNotetags2($dataEnemies);
      this.processDMGNotetags2($dataWeapons);
      this.processDMGNotetags2($dataArmors);
      this.processDMGNotetags2($dataStates);
      Yanfly._loaded_YEP_DamageCore = true;
    }
    return true;
};

DataManager.processDMGNotetags1 = function(group) {
  var noteD1 = /<(?:DAMAGE CAP|HEAL CAP|HEALING CAP):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    var damageFormulaMode = false;
    obj.damage.custom = false;
    obj.breakDamageCap = false;
    obj.damageCap = undefined;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:BREAK DAMAGE CAP|BYPASS DAMAGE CAP)>/i)) {
        obj.breakDamageCap = true;
        obj.damageCap = undefined;
      } else if (line.match(noteD1)) {
        obj.damageCap = parseInt(RegExp.$1);
        obj.breakDamageCap = false;
      } else if (line.match(/<(?:DAMAGE FORMULA)>/i)) {
        damageFormulaMode = true;
        obj.damage.formula = '';
        obj.damage.custom = true;
      } else if (line.match(/<\/(?:DAMAGE FORMULA)>/i)) {
        damageFormulaMode = false;
      } else if (damageFormulaMode) {
        obj.damage.formula = obj.damage.formula + line + '\n';
      }
    }
  }
};

DataManager.processDMGNotetags2 = function(group) {
  var noteD1 = /<(?:BREAK DAMAGE CAP|BYPASS DAMAGE CAP)>/i;
  var noteD2 = /<(?:DAMAGE CAP):[ ](\d+)>/i;
  var noteD3 = /<(?:HEAL CAP|HEALING CAP):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.breakDamageCap = undefined;
    obj.damageCap = undefined;
    obj.healCap = undefined;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(noteD1)) {
        obj.breakDamageCap = true;
        obj.damageCap = undefined;
        obj.healCap = undefined;
      } else if (line.match(noteD2)) {
        obj.damageCap = parseInt(RegExp.$1);
        obj.breakDamageCap = undefined;
      } else if (line.match(noteD3)) {
        obj.healCap = parseInt(RegExp.$1) * -1;
        obj.breakDamageCap = undefined;
      }
    }
  }
};

//=============================================================================
// BattleManager
//=============================================================================

if (Imported.YEP_BattleEngineCore) {
Yanfly.DMG.BattleManager_processActionSequence =
  BattleManager.processActionSequence;
  BattleManager.processActionSequence = function(actionName, actionArgs) {
    // BYPASS DAMAGE CAP
    if (actionName === 'BYPASS DAMAGE CAP') {
      return this.actionBypassDamageCap();
    }
    // DAMAGE CAP, HEALING CAP
    if (actionName === 'DAMAGE CAP' || actionName === 'HEALING CAP') {
      return this.actionDamageCap(actionArgs);
    }
    // DAMAGE RATE
    if (actionName === 'DAMAGE RATE') {
      return this.actionDamageRate(actionArgs);
    }
    // FLAT DAMAGE
    if (actionName === 'FLAT DAMAGE') {
      return this.actionFlatDamage(actionArgs);
    }
    // FLAT GLOBAL
    if (actionName === 'FLAT GLOBAL') {
      return this.actionFlatGlobal(actionArgs);
    }
    // FLAT HEAL
    if (actionName === 'FLAT HEAL') {
      return this.actionFlatHeal(actionArgs);
    }
    // GLOBAL RATE
    if (actionName === 'GLOBAL RATE') {
      return this.actionGlobalRate(actionArgs);
    }
    // HEAL RATE
    if (actionName === 'HEAL RATE') {
      return this.actionHealRate(actionArgs);
    }
    // RESET DAMAGE CAP
    if (actionName === 'RESET DAMAGE CAP') {
      return this.actionResetDamageCap();
    }
    // RESET DAMAGE MODIFIERS
    if (actionName === 'RESET DAMAGE MODIFIERS') {
      return this.actionResetDamageModifiers();
    }
    return Yanfly.DMG.BattleManager_processActionSequence.call(this,
      actionName, actionArgs);
  };
};

BattleManager.actionBypassDamageCap = function() {
    $gameSystem.actSeqBypassDamageCap();
    return true;
};

BattleManager.actionDamageCap = function(actionArgs) {
    if (!actionArgs) return;
    if (actionArgs[0]) {
      var value = parseInt(actionArgs[0]);
      $gameSystem.setActSeqDamageCap(value);
    }
    return true;
};

BattleManager.actionDamageRate = function(actionArgs) {
    if (actionArgs[0].match(/(?:VARIABLE|VAR)[ ](\d+)/i)) {
      var value = parseFloat($gameVariables.value(parseInt(RegExp.$1)) * 0.01);
    } else if (actionArgs[0].match(/(\d+)([%％])/i)) {
      var value = parseFloat(RegExp.$1 * 0.01);
    } else if (actionArgs[0].match(/(\d+).(\d+)/i)) {
      var value = parseFloat(String(RegExp.$1) + '.' + String(RegExp.$1));
    } else {
      return true;
    }
    $gameSystem._damageRate = value;
    return true;
};

BattleManager.actionFlatDamage = function(actionArgs) {
    if (actionArgs[0].match(/(?:VARIABLE|VAR)[ ](\d+)/i)) {
      var value = parseInt($gameVariables.value(parseInt(RegExp.$1)));
    } else if (actionArgs[0].match(/([\+\-]\d+)/i)) {
      var value = parseInt(RegExp.$1);
    } else if (actionArgs[0].match(/(\d+)/i)) {
      var value = parseInt(RegExp.$1);
    } else {
      return true;
    }
    $gameSystem._flatDamage = value;
    return true;
};

BattleManager.actionFlatGlobal = function(actionArgs) {
    if (actionArgs[0].match(/(?:VARIABLE|VAR)[ ](\d+)/i)) {
      var value = parseInt($gameVariables.value(parseInt(RegExp.$1)));
    } else if (actionArgs[0].match(/([\+\-]\d+)/i)) {
      var value = parseInt(RegExp.$1);
    } else if (actionArgs[0].match(/(\d+)/i)) {
      var value = parseInt(RegExp.$1);
    } else {
      return true;
    }
    $gameSystem._flatDamage = value;
    $gameSystem._flatHeal = value;
    return true;
};

BattleManager.actionFlatHeal = function(actionArgs) {
    if (actionArgs[0].match(/(?:VARIABLE|VAR)[ ](\d+)/i)) {
      var value = parseInt($gameVariables.value(parseInt(RegExp.$1)));
    } else if (actionArgs[0].match(/([\+\-]\d+)/i)) {
      var value = parseInt(RegExp.$1);
    } else if (actionArgs[0].match(/(\d+)/i)) {
      var value = parseInt(RegExp.$1);
    } else {
      return true;
    }
    $gameSystem._flatHeal = value;
    return true;
};

BattleManager.actionGlobalRate = function(actionArgs) {
    if (actionArgs[0].match(/(?:VARIABLE|VAR)[ ](\d+)/i)) {
      var value = parseFloat($gameVariables.value(parseInt(RegExp.$1)) * 0.01);
    } else if (actionArgs[0].match(/(\d+)([%％])/i)) {
      var value = parseFloat(RegExp.$1 * 0.01);
    } else if (actionArgs[0].match(/(\d+).(\d+)/i)) {
      var value = parseFloat(String(RegExp.$1) + '.' + String(RegExp.$1));
    } else {
      return true;
    }
    $gameSystem._damageRate = value;
    $gameSystem._healRate = value;
    return true;
};

BattleManager.actionHealRate = function(actionArgs) {
    if (actionArgs[0].match(/(?:VARIABLE|VAR)[ ](\d+)/i)) {
      var value = parseFloat($gameVariables.value(parseInt(RegExp.$1)) * 0.01);
    } else if (actionArgs[0].match(/(\d+)([%％])/i)) {
      var value = parseFloat(RegExp.$1 * 0.01);
    } else if (actionArgs[0].match(/(\d+).(\d+)/i)) {
      var value = parseFloat(String(RegExp.$1) + '.' + String(RegExp.$1));
    } else {
      return true;
    }
    $gameSystem._healRate = value;
    return true;
};

BattleManager.actionResetDamageCap = function() {
    $gameSystem.resetActSeqDamageCap();
    return true;
};

BattleManager.actionResetDamageModifiers = function() {
    $gameSystem.resetDamageSettings();
    return true;
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.DMG.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.DMG.Game_System_initialize.call(this);
    this.resetActSeqDamageCap();
    this.resetDamageSettings();
};

Game_System.prototype.resetActSeqDamageCap = function() {
    this._actSeqBypassDamageCap = false;
    this._actSeqDamageCap = undefined;
};

Game_System.prototype.actSeqBypassDamageCap = function() {
    this._actSeqBypassDamageCap = true;
};

Game_System.prototype.getActSeqBypassDamageCap = function() {
    return this._actSeqBypassDamageCap;
};

Game_System.prototype.setActSeqDamageCap = function(value) {
    this._actSeqDamageCap = value;
};

Game_System.prototype.getActSeqDamageCap = function() {
    return this._actSeqDamageCap;
};

Game_System.prototype.resetDamageSettings = function() {
    this._damageRate = 1.0;
    this._flatDamage = 0;
    this._healRate = 1.0;
    this._flatHeal = 0;
    this._defaultDamageCap = Yanfly.Param.DMGEnableCap;
};

Game_System.prototype.damageRate = function() {
    if (this._damageRate === undefined) this.resetDamageSettings();
    return this._damageRate;
};

Game_System.prototype.flatDamage = function() {
    if (this._flatDamage === undefined) this.resetDamageSettings();
    return this._flatDamage;
};

Game_System.prototype.healRate = function() {
    if (this._healRate === undefined) this.resetDamageSettings();
    return this._healRate;
};

Game_System.prototype.flatHeal = function() {
    if (this._flatHeal === undefined) this.resetDamageSettings();
    return this._flatHeal;
};

Game_System.prototype.isDamageCapped = function() {
    return this._defaultDamageCap;
};

Game_System.prototype.maximumDamage = function() {
    if (this._newDamageCap !== undefined) return this._newDamageCap;
    return Yanfly.Param.DMGMaxDamage;
};

Game_System.prototype.maximumHealing = function() {
    if (this._newHealingCap !== undefined) return this._newHealingCap;
    return Yanfly.Param.DMGMaxHealing * -1;
};

Game_System.prototype.setNewDamageCap = function(value, damage) {
    if (damage) {
      this._newDamageCap = value;
    } else {
      this._newHealingCap = value * -1;
    }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.DMG.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
    Yanfly.DMG.Game_BattlerBase_refresh.call(this);
    this.resetDMGTempValues();
};

Game_BattlerBase.prototype.resetDMGTempValues = function() {
    this._isDMGCapped = undefined;
    this._maximumDamage = undefined;
    this._maximumHealing = undefined;
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.DMG.Game_Battler_performActionEnd =
    Game_Battler.prototype.performActionEnd;
Game_Battler.prototype.performActionEnd = function() {
    Yanfly.DMG.Game_Battler_performActionEnd.call(this);
    $gameSystem.resetDamageSettings();
};

Game_Battler.prototype.isDamageCapped = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state && state.breakDamageCap) return this._isDMGCapped = false;
    }
    return this._isDMGCapped = $gameSystem.isDamageCapped();
};

Game_Battler.prototype.maximumDamage = function() {
    var value = $gameSystem.maximumDamage();
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state && state.damageCap) value = Math.max(value, state.damageCap);
    }
    return value;
};

Game_Battler.prototype.maximumHealing = function() {
  var value = $gameSystem.maximumHealing();
  for (var i = 0; i < this.states().length; ++i) {
    var state = this.states()[i];
    if (state && state.healCap) value = Math.min(value, state.healCap);
  }
  return value;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.isDamageCapped = function() {
  if (this._isDMGCapped !== undefined) return this._isDMGCapped;
  if (this.actor().breakDamageCap) return this._isDMGCapped = false;
  if (this.currentClass().breakDamageCap) return this._isDMGCapped = false;
  for (var i = 0; i < this.equips().length; ++i) {
    var equip = this.equips()[i];
    if (equip && equip.breakDamageCap) return this._isDMGCapped = false;
  }
  return Game_Battler.prototype.isDamageCapped.call(this);
};

Game_Actor.prototype.maximumDamage = function() {
    if (this._maximumDamage !== undefined) return this._maximumDamage;
    var value = Game_Battler.prototype.maximumDamage.call(this);
    if (this.actor().damageCap) {
      value = Math.max(value, this.actor().damageCap);
    }
    if (this.currentClass().damageCap) {
      value = Math.max(value, this.currentClass().damageCap);
    }
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.damageCap) value = Math.max(value, equip.damageCap);
    }
    return this._maximumDamage = value;
};

Game_Actor.prototype.maximumHealing = function() {
    if (this._maximumHealing !== undefined) return this._maximumHealing;
    var value = Game_Battler.prototype.maximumHealing.call(this);
    if (this.actor().healCap) {
      value = Math.min(value, this.actor().healCap);
    }
    if (this.currentClass().healCap) {
      value = Math.min(value, this.currentClass().healCap);
    }
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.healCap) value = Math.min(value, equip.healCap);
    }
    return this._maximumHealing = value;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.isDamageCapped = function() {
  if (this._isDMGCapped !== undefined) return this._isDMGCapped;
  if (this.enemy().breakDamageCap) return this._isDMGCapped = false;
  return Game_Battler.prototype.isDamageCapped.call(this);
};

Game_Enemy.prototype.maximumDamage = function() {
    if (this._maximumDamage !== undefined) return this._maximumDamage;
    var value = Game_Battler.prototype.maximumDamage.call(this);
    if (this.enemy().damageCap) {
      value = Math.max(value, this.enemy().damageCap);
    }
    return this._maximumDamage = value;
};

Game_Enemy.prototype.maximumHealing = function() {
    if (this._maximumHealing !== undefined) return this._maximumHealing;
    var value = Game_Battler.prototype.maximumHealing.call(this);
    if (this.enemy().healCap) {
      value = Math.min(value, this.enemy().healCap);
    }
    return this._maximumHealing = value;
};

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.makeDamageValue = function(target, critical) {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var baseDamage = this.evalDamageFormula(target);
    var value = baseDamage;
    eval(Yanfly.DMG.DamageFlow);
    return Math.round(value);
};

Game_Action.prototype.evalDamageFormula = function(target) {
    try {
        var item = this.item();
        var a = this.subject();
        var b = target;
        var user = this.subject();
        var subject = this.subject();
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
        var value = 0;
        if (item.damage.custom) {
          eval(item.damage.formula);
          value = Math.max(value, 0) * sign;
        } else {
          value = Math.max(eval(item.damage.formula), 0) * sign;
        }
        return value;
    } catch (e) {
        return 0;
    }
};

Game_Action.prototype.modifyCritical = function(critical, baseDamage, target) {
    return critical;
};

Game_Action.prototype.modifyBaseDamage = function(value, baseDamage, target) {
    if (this.calcElementRate(target) < 0) baseDamage *= -1;
    return baseDamage;
};

Game_Action.prototype.applyDamageRate = function(value, baseDamage, target) {
    value *= $gameSystem.damageRate();
    value = Math.max(0, value);
    return value;
};

Game_Action.prototype.applyHealRate = function(value, baseDamage, target) {
    value *= $gameSystem.healRate();
    value *= target.rec;
    value = Math.min(0, value);
    return value;
};

Game_Action.prototype.applyCriticalRate = function(value, baseDamage, target) {
    value = this.applyCritical(value);
    return value;
};

Game_Action.prototype.applyPhysicalRate = function(value, baseDamage, target) {
    value *= target.pdr;
    return value;
};

Game_Action.prototype.applyFlatPhysical = function(value, baseDamage, target) {
    return value;
};

Game_Action.prototype.applyMagicalRate = function(value, baseDamage, target) {
    value *= target.mdr;
    return value;
};

Game_Action.prototype.applyFlatMagical = function(value, baseDamage, target) {
    return value;
};

Game_Action.prototype.applyFlatDamage = function(value, baseDamage, target) {
    value += $gameSystem.flatDamage();
    return value;
};

Game_Action.prototype.applyFlatHeal = function(value, baseDamage, target) {
    value -= $gameSystem.flatHeal();
    return value;
};

Game_Action.prototype.applyFlatCritical = function(value, baseDamage, target) {
    return value;
};

Game_Action.prototype.applyFlatGlobal = function(value, baseDamage, target) {
    return value;
};

Game_Action.prototype.applyMinimumDamage = function(value, baseDamage, target) {
    if (baseDamage > 0) {
      value = Math.max(0, value);
    } else if (baseDamage < 0) {
      value = Math.min(0, value);
    }
    if (this.isDamageCapped(this.item())) {
      if ($gameSystem.getActSeqDamageCap() !== undefined) {
        var min = $gameSystem.getActSeqDamageCap() * -1;
        var max = $gameSystem.getActSeqDamageCap();
      } else if (this.item().damageCap) {
        var min = this.item().damageCap * -1;
        var max = this.item().damageCap;
      } else {
        var min = this.subject().maximumHealing();
        var max = this.subject().maximumDamage();
      }
      value = value.clamp(min, max);
    }
    return value;
};

Game_Action.prototype.isDamageCapped = function(item) {
    if ($gameSystem.getActSeqBypassDamageCap()) return false;
    if ($gameSystem.getActSeqDamageCap() !== undefined) return true;
    if (item.damageCap !== undefined) return true;
    if (item.breakDamageCap) return false;
    return this.subject().isDamageCapped();
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.DMG.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.DMG.Game_Interpreter_pluginCommand.call(this, command, args)
    if (command === 'SetDamageCap') this.setDamageCap(args);
    if (command === 'SetHealingCap') this.setHealingCap(args);
    if (command === 'EnableDamageCap') this.setDefaultDamageCap(true);
    if (command === 'DisableDamageCap') this.setDefaultDamageCap(false);
};

Game_Interpreter.prototype.setDamageCap = function(args) {
    $gameSystem.setNewDamageCap(parseInt(args[0]), true);
};

Game_Interpreter.prototype.setHealingCap = function(args) {
    $gameSystem.setNewDamageCap(parseInt(args[0]), false);
};

Game_Interpreter.prototype.setDefaultDamageCap = function(value) {
    $gameSystem._defaultDamageCap = value;
};

//=============================================================================
// End of File
//=============================================================================
