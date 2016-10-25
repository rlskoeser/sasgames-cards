---
name: nasaga-legacy
title: NASAGA Legacy
---

<p>Play a standard card game (like Uno, Rummy, Hearts or Poker) with
    additional community contributed rules. Anyone can add new rules to
    take advantage of the unique cards in this deck.</p>

<div class="tabGroup">
    <input type="radio" name="base-game" id="uno" value="uno" checked="checked"/>
    <label for="uno">Uno</label>
    <div class="tabcontent">
        <p><b>Objective:</b> Get rid of all your cards first.</p>
        <p><b>Setup:</b> Deal each player 7 cards, and then flip up a starting card.
            The player to the right of the dealer goes first.</p>
        <p><b>Play:</b> Play a card to the discard pile that matches the current
            card suit or rank.</p>
    </div>

    <input type="radio" name="base-game" id="rummy" value="rummy"/>
    <label for="rummy">Rummy</label>
    <div class="tabcontent">
        <p><b>Objective:</b> End your turn with all your cards in valid sets.
            A valid set consists of either a 3 (or more) of a kind of a card rank,
            or a run of 3 (or more) cards such as 4,5,6 of the same suit.</p>
        <p><b>Setup:</b> Deal each player 10 cards.</p>
        <p><b>Play:</b> Draw a card from either the deck or the top card of the
            discard pile and end your turn by discarding a card to the discard pile.
            You must discard on your winning hand.</p>
    </div>

    <input type="radio" name="base-game" id="hearts" value="hearts"/>
    <label for="hearts">Hearts</label>
    <div class="tabcontent">
        <p><b>Objective:</b> Score the fewest points.</p>
        <p><b>Setup:</b> Deal out all the cards evenly to the players, with
            the remaining cards (if any) face-down in the center. The player with the 2 of 🎲 plays first and must play the 2 of 🎲.  Play continues in clock-wise order.</p>
        <p><b>Play:</b> Play a card and follow suit, if able. The highest card of the first suit played takes the trick.  The winner puts all the played cards in their score pile, and then starts the next round.</p>
        <p><b>Scoring:</b> The 🎨 suit cards are all worth one point. The first player to take a trick with a point card takes in the leftover cards from the center (if any) and can look at them privately. After all cards have been played, tally up each players score. If a player takes all the points for the round, they "shoot the moon" and instead give that number to every other player and score a zero for the round. Play additional rounds until one player has over 50 points, then the lowest score wins.</p>
    </div>

    <input type="radio" name="base-game" id="poker" value="poker"/>
    <label for="poker">Poker</label>
    <div class="tabcontent">
        <p><b>Objective:</b> To gather the most chips.</p>
        <p><b>Setup:</b> Give every player an equal amount of betting chips.
            Deal each player 5 cards.</p>
        <p><b>Play:</b> A round of betting can happen here and if you don't match a bet, you must fold out of the hand. The players can then exchange up to 4 cards for new cards. A second round of betting occurs. After all betting is done, the players who haven't folded out reveal their hands and the highest hand wins.</p>
        <p><b>Scoring:</b> Order of hands: 5 of a kind, Straight flush, 4 of a kind, Full House, Flush, Straight, 3 of a Kind, 2 pairs of cards, 1 pair of cards.</p>
    </div>

</div>


<p><a target="_blank" href="https://goo.gl/forms/urR1HZtsDoBOHmk03">Submit new rules</a> to share them with everyone.</p>

<b>Extra rules:</b>
<ul id="nasaga-legacy-rules"/>
