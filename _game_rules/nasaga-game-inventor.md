---
name: game-inventor
title: Game Inventor
---

<p>Randomly select a card from each suit:</p>

<ul class="nostyle">
    <li class="game-type">Game Type</li>
    <li class="game-mechanism">Game Mechanism</li>
    <li class="game-audience">Audience</li>
    <li class="game-theme">Theme or Flavor</li>
</ul>

<p>Brainstorm a game with these components and discuss your ideas with
    others.</p>

<div class="card-view modal" style="display:none">
    <img/>
</div>

<div class="game-inventor-share modal" style="display:none">
    <div class="inner">
      <a class="close"><i class="fa fa-times fa-lg" aria-hidden="true"></i></a>
        <p>Copy this url and send to a friend to share this set of cards.</p>
        <input type="text" value="http://..."/>
        <a class="copy"><i class="fa fa-clipboard fa-lg" aria-hidden="true"></i></a>
    </div>
</div>

<ul id="game-inventor-cards" class="baraja-container">
  <li>
    <!-- <img class="type"/> -->
    <picture class="type">
      <source
        media="(max-width: 480px)"
        srcset=""/>
      <img/>
    </picture>

  </li>
  <li>
    <picture class="mechanism">
      <source
        media="(max-width: 480px)"
        srcset=""/>
      <img/>
    </picture>
    <!-- <img class="mechanism"/> -->
  </li>
  <li>
    <img class="audience"/>
    <picture class="audience">
      <source
        media="(max-width: 480px)"
        srcset=""/>
      <img/>
    </picture>
  </li>
  <li>
    <img class="theme"/>
    <picture class="theme">
      <source
        media="(max-width: 480px)"
        srcset=""/>
      <img/>
    </picture>
  </li>
</ul>
