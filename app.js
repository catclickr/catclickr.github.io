$(document).ready(function() {
    // CATS
    let cats=0;

    // SHOP RELATED
    let items={
        "mouse": {
            "count": 0,
            "price": 15
        },
        "bird": {
            "count": 0,
            "price": 100
        }
    }
    function set_shop() {
        // MOUSE
        $("#mouse_price").text(`$${items["mouse"]["price"]}`);
        $("#mouse_count").text(`${items["mouse"]["count"]}`);

        // BIRD
        $("#bird_price").text(`$${items["bird"]["price"]}`);
        $("#bird_count").text(`${items["bird"]["count"]}`);
    }
    set_shop();

    $(".update-shop").click(set_shop());

    item_interval("mouse", 1);
    item_interval("bird", 5);

    function item_interval(shop_item, cats_per_second) {
        $(`.${shop_item}`).click(function() {
            console.log(cats);
            if (cats>=items[`${shop_item}`]["price"]) {
                cats-=items[`${shop_item}`]["price"];
                items[`${shop_item}`]["count"]++;
                items[`${shop_item}`]["price"]+=Math.floor(items[`${shop_item}`]["price"]*1.7);
                $(`#${shop_item}_price`).text(`$${items[`${shop_item}`]["price"]}`);
     
                setInterval(function() {
                    console.log(`${shop_item} interval`);
                    cats+=cats_per_second;
                    $("#cats").text(`Cats: ${cats}`);
                }, (items[`${shop_item}`]["count"]==0?100000:1000/items[`${shop_item}`]["count"]));
            } else {
                alert("Not enough cats!");
            }
        });
    }

    // CHANGE CAT IMAGE
    $(".cat").mousedown(function() {
        $(this).attr("src", "pop_cat_open.jpg");
        cats++;
        $("#cats").text(`Cats: ${cats}`);
    });
    $(".cat").mouseup(function() {
        $(this).attr("src", "pop_cat_closed.jpg");
    });
});