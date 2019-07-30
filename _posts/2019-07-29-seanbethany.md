---
title: Sean and Bethany
layout: game-rules
extra_class: seanbethany
banner:
description: >
    Custom card deck and games for a wedding favor and reception
    entertainment.
categories:
    - rules
    - weddings
extra_js:
    - games.js
---


<h1 class="page-heading">Sean and Bethany Wedding cards</h1>

<div>
<p>Thank you for celebrating the marriage of Sean and Bethany. They are grateful to know you.</p>

</div>

{% comment %} Welcome {% endcomment %}
{% assign game = site.game_rules | where:'name', 'welcome' | first %}
 {% include game.html title="Welcome!" %}

{% comment %} Low to High {% endcomment %}
{% assign game = site.game_rules | where:'name', 'low-to-high' | first %}
 {% include game.html %}

{% comment %} Black Sheep {% endcomment %}
{% assign game = site.game_rules | where:'name', 'blacksheep' | first %}
 {% include game.html %}

{% comment %} Word Connections {% endcomment %}
{% assign game = site.game_rules | where:'name', 'word-xns' | first %}
 {% include game.html style="wedding" ps='<p>If the game ends tied, then you should play a quick game of Tie-Breaker.</p>' %}

{% comment %} Tie Breaker {% endcomment %}
{% assign game = site.game_rules | where:'name', 'tiebreaker' | first %}
 {% include game.html %}

{% comment %} And Then {% endcomment %}
{% assign game = site.game_rules | where:'name', 'and-then' | first %}
 {% include game.html %}

{% comment %} Kings Reverse {% endcomment %}
{% assign game = site.game_rules | where:'name', 'kings-reverse-sb' | first %}
 {% include game.html %}

<script>
$( document ).ready(function() {
    $('.word-connections').connectionsBoard();
    loadLegacyRules('1xhag1ERquvejlk48ZH2RBdg8yZcKVT0DJszHYaUx63U', '#new-kingsreverse-rules');
});
</script>