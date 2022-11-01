<script>
    let levelIcon = "🔴";
    let levelNumber = 1;
    let levelName = "Beginner";
    let currentPoints = 0;
    let maxLevelPoints = 100;
</script>

<style>

.statusWrapper {
    text-align: center;
    border: 1px solid black;
    overflow: hidden; /* will contain if #first is longer than #second */
}
.levelStatus {
    float:left; /* add this */
    border: 1px solid red;
}
.pointsStatus {
    border: 1px solid green;
    overflow: hidden; /* if you don't want #second to wrap below #first */
}
</style>


<h3>Progress</h3>
<div class=statusWrapper></div>
<div class="levelStatus">
    Level<br/>
    {levelIcon}<br/>
    {levelNumber}<br/>
    {levelName}<br/>
</div>
<div class="pointsStatus">
    Pilotpoints<br/>
    <progress value="30" max="100"></progress><br/>
    {currentPoints}/{maxLevelPoints}<br/>
</div>
