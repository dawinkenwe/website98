# Minesweeper Woes

It all started here

![minesweeper revealed tiles not aligned](/imgs/minesweeper_woes_photos/minesweeper_css_boxes.png)

My minesweeper grid was nice and neatly aligned. Except. When a square was revealed, it would somehow displace itself so it was no longer vertically aligned with its brethren. It was not aligned in a grid.

As it turns out, there's a whole css styling / html layout CALLED grid, so I decided to learn about it and migrate my code to use it. While I was at it, I figured I'd clean up some of the display loops I was using to use forEach instead, as I found it more readable at the time. So I go to run it and...

![for each resulted in an empty grid](/imgs/minesweeper_woes_photos/minesweeper_foreach.png)

Suddenly my parent div was empty. After checking with google and Chad Gippidy (hey, he's good at syntax sometimes, don't judge me, or at least not for this, there's other things you could judge me for mom, sheesh.)

Turns out forEach does not return anything. I had previously been using .slice().map(). I wanted to use forEach to have it be a single call. I somehow didn't register that I could just do map() by itself.

Anyways, once I had that sorted, I ran the program again and BAM

![grid only had one column](/imgs/minesweeper_woes_photos/minesweeper_grid_no_work.png)

My grid only had one column... I was sure I had set it to have multiple columns. let's check the code.
``style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1.25rem);` }}``

Did you see it?
>! It's that sneaky ';' No one told me to put it there; and yet i did. just as grammatically incorrect as the semicolon last sentence.

let's just remove that aaaannnd

![borders still not right](/imgs/minesweeper_woes_photos/minesweeper_cloer_but_not_there.png)

Dammit. So close. After a trip back to the docs on how display grid works, I added a 5px rowGap and columnGap and VIOLA!
![it's beautiful](/imgs/minesweeper_woes_photos/minesweeper_fixed_spacing.png)
