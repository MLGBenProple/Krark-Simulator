var num_of_krark = 0
var num_of_veyren = 0
var num_of_prodegy = 0
var num_of_storm_kiln = 0
var num_of_archmage = 0
var num_of_bergi = 0
var num_of_scoundrel = 0
var num_of_thumbs = 0
var storm_count = 0
var cast_limit = 0
var treasures = 0
var blue_mana = 0
var red_mana = 0
var magecraft_plus = 0
var draw_cards = 0
var num_of_copies = 0
var spell_is_back_in_hand = true
var toss = []
var toss_grouped_by_thumb = []
var all_tosses = []

function tossCoin() {
    var result = Math.random() < 0.5
    if (result) {
        toss.push('H')
    } else {
        toss.push('T')
    }
    return result
}

function tossMultipleCoins(num_of_thumbs) {
    var result = 0
    if (tossCoin()) {
        result++
    } else {
        result--
    }
    for (let i = 0; i < num_of_thumbs; i++) {
        if (tossCoin()) {
            result++
        } else {
            result--
        }
    }
    return result
}

function copySpell() {
    num_of_copies++
    magecraftTriggers()
}

function krarkTriggers() {
    if (num_of_veyren != 0 || num_of_prodegy != 0) {
        for (let i = 0; i <= num_of_veyren + num_of_prodegy; i++) {
            for (let i = 0; i < num_of_krark; i++) {
                if (num_of_thumbs > 0) {
                    var result = tossMultipleCoins(num_of_thumbs)
                    if (result == (num_of_thumbs + 1) * -1) {
                        spell_is_back_in_hand = true
                    }
                    else if (result == num_of_thumbs + 1) {
                        copySpell()
                        for (let i = 0; i < num_of_scoundrel; i++) {
                            treasures++
                            treasures++
                        }
                    } else {
                        if (spell_is_back_in_hand) {
                            copySpell()
                            for (let i = 0; i < num_of_scoundrel; i++) {
                                treasures++
                                treasures
                            }
                        } else {
                            spell_is_back_in_hand = true
                        }
                    }
                } else {
                    if (tossCoin()) {
                        copySpell()
                        for (let i = 0; i < num_of_scoundrel; i++) {
                            treasures++
                            treasures++
                        }
                    } else {
                        spell_is_back_in_hand = true
                    }
                }
            }
        }
    } else {
        for (let i = 0; i < num_of_krark; i++) {
            if (num_of_thumbs > 0) {
                var result = tossMultipleCoins(num_of_thumbs)
                if (result == (num_of_thumbs + 1) * -1) {
                    spell_is_back_in_hand = true
                }
                else if (result == num_of_thumbs + 1) {
                    copySpell()
                    for (let i = 0; i < num_of_scoundrel; i++) {
                        treasures++
                        treasures++
                    }
                } else {
                    if (spell_is_back_in_hand) {
                        copySpell()
                        for (let i = 0; i < num_of_scoundrel; i++) {
                            treasures++
                            treasures
                        }
                    } else {
                        spell_is_back_in_hand = true
                    }
                }
            } else {
                if (tossCoin()) {
                    copySpell()
                    for (let i = 0; i < num_of_scoundrel; i++) {
                        treasures++
                        treasures++
                    }
                } else {
                    spell_is_back_in_hand = true
                }
            }
        }
    }
}

function magecraftTriggers() {
    if (num_of_veyren != 0 || num_of_prodegy != 0) {
        for (let i = 0; i <= num_of_veyren + num_of_prodegy; i++) {
            if (num_of_storm_kiln > 0 || num_of_archmage > 0) {
                magecraft_plus++
                for (let i = 0; i < num_of_storm_kiln; i++) {
                    treasures++
                }
                for (let i = 0; i < num_of_archmage; i++) {
                    draw_cards++
                }
            }
        }
    } else {
        if (num_of_storm_kiln > 0 || num_of_archmage > 0) {
            magecraft_plus++
            for (let i = 0; i < num_of_storm_kiln; i++) {
                treasures++
            }
            for (let i = 0; i < num_of_archmage; i++) {
                draw_cards++
            }
        }
    }
}

function spellCast() {
    storm_count++
    spell_is_back_in_hand = false
    toss = []
    toss_grouped_by_thumb = []
    if (num_of_veyren != 0) {
        for (let i = 0; i <= num_of_veyren; i++) {
            for (let i = 0; i < num_of_bergi; i++) {
                red_mana++
            }
        }
    } else {
        for (let i = 0; i < num_of_bergi; i++) {
            red_mana++
        }
    }
    magecraftTriggers()
    krarkTriggers()

    if (num_of_thumbs > 0) {
        for (let i = 0; i < toss.length; i += parseFloat(num_of_thumbs) + 1) {
            var chunk = toss.slice(i, i + parseFloat(num_of_thumbs) + 1);
            toss_grouped_by_thumb.push(chunk)
        }
        all_tosses.push(toss_grouped_by_thumb)
    } else {
        all_tosses.push(toss)
    }
}

function popOff() {
    num_of_krark = document.getElementById('number_of_krark').value
    num_of_veyren = document.getElementById('number_of_veyren').value
    num_of_prodegy = document.getElementById('number_of_prodigy').value
    num_of_storm_kiln = document.getElementById('number_of_storm_kiln').value
    num_of_archmage = document.getElementById('number_of_archmage').value
    num_of_bergi = document.getElementById('number_of_bergi').value
    num_of_scoundrel = document.getElementById('number_of_scoundrel').value
    num_of_thumbs = document.getElementById('number_of_thumb').value
    cast_limit = document.getElementById('cast_limit').value
    for (let i = 0; i < cast_limit; i++) {
        if (spell_is_back_in_hand) {
            spellCast()
        }
    }

    return {
        'storm_count': storm_count,
        'treasures': treasures,
        'blue_mana': blue_mana,
        'red_mana': red_mana,
        'magecraft_triggers': magecraft_plus,
        'draw_cards': draw_cards,
        'num_of_times_to_apply_effect': num_of_copies + 1,
        'spell_in_hand': spell_is_back_in_hand,
        'tosses': all_tosses,
        'copies': num_of_copies
    }
}

function displayTosses() {
    var spell_number = '1'
    var displayed_tosses = document.createElement('div')
    all_tosses.forEach(function(toss){
        var toss_element = document.createElement('p')
        toss_element.innerHTML = 'Cast'+spell_number+':'
        if(num_of_thumbs > 0){
            toss.forEach(function(thumb_flips){
                toss_element.innerHTML = toss_element.innerHTML+'['+thumb_flips+']'
            })
        } else {
            toss_element.innerHTML = toss_element.innerHTML+toss
        }
        displayed_tosses.appendChild(toss_element)
        spell_number++
    })
    return displayed_tosses
}

document.addEventListener('submit', (e) => {
    e.preventDefault()
    num_of_krark = 0
    num_of_veyren = 0
    num_of_prodegy = 0
    num_of_storm_kiln = 0
    num_of_archmage = 0
    num_of_bergi = 0
    num_of_scoundrel = 0
    num_of_thumbs = 0
    storm_count = 0
    cast_limit = 0
    treasures = 0
    blue_mana = 0
    red_mana = 0
    magecraft_plus = 0
    draw_cards = 0
    num_of_copies = 0
    spell_is_back_in_hand = true
    toss = []
    toss_grouped_by_thumb = []
    all_tosses = []
    document.getElementById('toss_simulation').innerHTML = ''
    var result = popOff()
    document.getElementById('number_of_magecraft_triggers').innerHTML = result.magecraft_triggers
    document.getElementById('blue_mana').innerHTML = result.blue_mana
    document.getElementById('red_mana').innerHTML = result.red_mana
    document.getElementById('treasures').innerHTML = result.treasures
    document.getElementById('cards_drawn').innerHTML = result.draw_cards
    document.getElementById('apply_effect').innerHTML = result.num_of_times_to_apply_effect
    document.getElementById('spell_in_hand').innerHTML = result.spell_in_hand
    document.getElementById('storm_count').innerHTML = result.storm_count
    document.getElementById('number_of_copies').innerHTML = result.copies
    document.getElementById('toss_simulation').appendChild(displayTosses())
    document.getElementById('results').style.display = "block"
})