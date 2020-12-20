<template>
    <div>
        <div class="stats animate__animated animate__flipInX">
            <p>У вас {{this.$store.state.days}} тренировачный день.</p>
            <p>Ваш последний результат - решено {{this.$store.state.lastSolved}} задач(а) за
                {{this.$store.state.lastTime}} минут и уровне {{this.$store.state.lastLevel}}.</p>
            <p>Общая точность: {{findPercent()}}</p>
        </div>
        <img class="settingsLogo" alt="Settings" src="./mathematical.gif">
    </div>
</template>

<script>
    export default {
        name: 'Home',
        methods: {
            findPercent() {
                if (this.$store.state.solved !== 0 && this.$store.state.misses) {
                    return (this.$store.state.solved / (this.$store.state.solved + this.$store.state.misses)) * 100 + '%';
                } else {
                    return 'Пока нет статистики!'
                }

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .stats {
        background: linear-gradient(90deg, rgba(240, 121, 121, 0.352) 0%, rgba(244, 59, 59, 0.248) 14.13%, rgba(9, 255, 78, 0.336) 98.39%);
        border: 1px solid #1EBD54;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    p {
        font-size: large;
        font-family: Roboto, fantasy;
        font-style: normal;
    }
</style>
