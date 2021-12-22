new Vue({
    el: "#app",
    data: {
        player_heal: 100,
        monster_heal: 100,
        game_is_on: false,
        logs: []
    },
    methods: {
        start_game: function() {
            this.game_is_on = true;
        },
        attack: function() {
            var point = Math.ceil(Math.random() * 10);
            this.monster_heal = this.monster_heal - point;
            this.addLog({ turn: "Player", text: "PLAYER ATTACK (" + point + ")" })

            this.monster_attack();
        },
        monster_attack: function() {
            var point = Math.ceil(Math.random() * 15);
            this.addLog({ turn: "Monster", text: "MONSTER ATTACK (" + point + ")" })
            this.player_heal = this.player_heal - point;
        },
        special_attack: function() {
            var point = Math.ceil(Math.random() * 25);
            this.monster_heal -= point
            this.addLog({ turn: "Player", text: "SPECIAL ATTACK (" + point + ")" })
            this.monster_attack();
        },
        heal_up: function() {
            var point = Math.ceil(Math.random() * 20);
            this.player_heal += point
            this.addLog({ turn: "Player", text: "HEALTH (" + point + ")" })
            this.monster_attack();
        },
        give_up: function() {
            this.player_heal = 0;
            this.addLog({ turn: "Player", text: "Player gave up !" })
        },
        addLog: function(log) {
            this.logs.push(log)
        }
    },
    watch: {
        /**
         * to watch healthies 
         */
        player_heal: function(value) {
            if (value <= 0) {
                this.player_heal = 0;
                if (confirm("You are dead. Do you want to try again ? ")) {
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.logs = []
                }
            } else if (value >= 100) {
                this.player_heal = 100;
            }
        },
        monster_heal: function(value) {
            if (value <= 0) {
                this.monster_heal = 0;
                if (confirm("You are winner now. Do you want to try again ? ")) {
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.logs = []
                }
            } else if (value >= 100) {
                this.monster_heal = 100;
            }
        }
    }
});