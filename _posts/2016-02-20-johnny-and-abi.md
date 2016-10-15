---
title: Johnny and Abi
layout: game-rules
banner:
    default: abi-johnny-wide.png
    medium: abi-johnny-wide_850.png
    small: abi-johnny-wide_480.png
description: >
    Custom card deck and games for a wedding favor and reception
    entertainment.
categories:
    - rules
    - weddings
extra_js:
    - games.js
---


<h1 class="page-heading">Johnny and Abi Wedding cards</h1>

<h2>Thank you! Xie Xie! Gracias! Multumesc!</h2>

<div>
<p>Thank you for celebrating the marriage of Johnny and Abigail Liu. These cards are full of things that Johnny and Abi love as well as moments that they have shared together.</p>

<p>We hope you have fun learning more about Johnny and Abi as you interact with the cards through these games. When you pull out your wedding favor cards in the future to play these or other games, take a moment to pray for Johnny and Abi's marriage.</p>
</div>

{% comment %} Welcome {% endcomment %}
{% assign game = site.game_rules | where:'name', 'welcome' | first %}
 {% include game.html title="Welcome to the Table" %}

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

{% comment %} Liu-O {% endcomment %}
{% assign game = site.game_rules | where:'name', 'liu-o' | first %}
 {% include game.html %}

