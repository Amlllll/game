new Vue({
    el: '#app',
    data: {
        PlayerHealth: 100,
        MonsterHealth: 100,
        gameIsRunning: false,
        turns: []

    },
    methods: {
        StartGame() {
            this.gameIsRunning = true,
                this.PlayerHealth = 100,
                this.MonsterHealth = 100;
            this.turns = [];


        },
        attack() {
            var damage = this.CalculateDamage(3, 10);

            this.MonsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
            if (this.checkWin()) {
                return;

            }

            this.monsterAttack();


        },
        specialattack() {

            var damage = this.CalculateDamage(10, 20);
            this.MonsterHealth -= damage;

            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for ' + damage
            });

            if (this.checkWin()) {
                return;

            }

            this.monsterAttack();

        },
        heal() {

            if (this.PlayerHealth <= 90) {
                this.PlayerHealth += 10;
            } else {
                this.PlayerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals  for 10 '
            });
            this.monsterAttack();

        },
        giveup() {
            this.gameIsRunning = false;

        },

        monsterAttack() {
            var damage = this.CalculateDamage(5, 12);
            this.PlayerHealth -= damage;
            this.checkWin();


            this.turns.unshift({
                isPlayer: false,
                text: 'Monster  hits Player for ' + damage
            });

        },
        CalculateDamage(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);

        },
        checkWin() {
            if (this.MonsterHealth <= 0) {
                if (confirm('You Win! New game!')) {
                    this.StartGame();


                } else {
                    this.gameIsRunning = false;
                }
                return true;


            } else if (this.PlayerHealth <= 0) {
                if (confirm('You lost! New game!')) {
                    this.StartGame();


                } else {
                    this.gameIsRunning = false;
                }
                return true;

            }
            return false;

        }
    }
})