$(document).ready(function() {
    // CATS
    let cats=0;
    let cats_per_second=0;
    let cats_per_click=1;

    // SHOP RELATED
    let items={
        "mouse": {
            "count": 0,
            "price": 15
        },
        "birdy": {
            "count": 0,
            "price": 50
        },
        "dot": {
            "count": 0,
            "price": 75,
        }
    }
    function set_shop() {
        // MOUSE
        $("#mouse_price").text(`$${items["mouse"]["price"]}`);
        $("#mouse_count").text(`${items["mouse"]["count"]}`);

        // BIRDY
        $("#birdy_price").text(`$${items["birdy"]["price"]}`);
        $("#birdy_count").text(`${items["birdy"]["count"]}`);

        // DOT
        $("#dot_price").text(`$${items["dot"]["price"]}`);
        $("#dot_count").text(`${items["dot"]["count"]}`);
    }
    set_shop();

    $(".update-shop").click(set_shop());

    item_interval("mouse", 2);
    item_interval("birdy", 10);

    function item_interval(shop_item, cats_per_second) {
        $(`.${shop_item}`).click(function() {
            items[shop_item]["count"]++;
            if (cats>=items[shop_item]["price"]) {
                cats-=items[shop_item]["price"];
                items[shop_item]["price"]+=Math.floor(items[shop_item]["price"]*1.6);
                $(`#${shop_item}_price`).text(`$${items[`${shop_item}`]["price"]}`);

                $(`.${shop_item}_count`).text(items[shop_item]["count"]);
     
                setInterval(function() {
                    console.log(`${shop_item} interval`);
                    cats+=cats_per_second;
                    $("#cats-count").text(`${cats}`);
                }, (items[`${shop_item}`]["count"]==0?100000:1000/items[shop_item]["count"]));

                set_shop();
            } else {
                alert("Not enough cats!");
            }
        });
    }
    
    $(".dot").click(function() {
        click_efficiency("dot", 2);
    });

    function click_efficiency(shop_item, multiplier) {
        if (cats>=items[shop_item]["price"]) {
            cats-=items[shop_item]["price"];
            cats_per_click*=multiplier;
            items[shop_item]["price"]*=5;
            items[shop_item]["count"]++;
            $(`#${shop_item}_count`).text(items[shop_item]["count"]);
            $(`#${shop_item}_price`).text(`$${items[shop_item]["price"]}`);
        } else {
            alert("Not enough cats!");
        }
    }

    // CHANGE CAT IMAGE
    $(".cat").mousedown(function() {
        $(this).attr("src", "pop_cat_open.jpg");
        cats+=cats_per_click;
        $("#cats-count").text(`${cats}`);
    });
    $(".cat").mouseup(function() {
        $(this).attr("src", "pop_cat_closed.jpg");
    });

    $(window).mousemove(function(e) {
        $("#heart").css({
            "transform": `translate(${e.clientX}px, ${e.clientY}px)`
        });
    });
});