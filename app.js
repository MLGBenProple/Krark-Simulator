var num_of_krark = parseFloat(0)
var num_of_veyren = parseFloat(0)
var num_of_prodigy = parseFloat(0)
var num_of_storm_kiln = parseFloat(0)
var num_of_archmage = parseFloat(0)
var num_of_bergi = parseFloat(0)
var num_of_scoundrel = parseFloat(0)
var num_of_thumbs = parseFloat(0)
var aggressive_thumb_strategy = false
var storm_count = parseFloat(0)
var cast_limit = parseFloat(0)
var treasures = parseFloat(0)
var blue_mana = parseFloat(0)
var red_mana = parseFloat(0)
var magecraft_plus = parseFloat(0)
var draw_cards = parseFloat(0)
var num_of_copies = parseFloat(0)
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
    if (num_of_veyren != 0 || num_of_prodigy != 0) {
        for (let i = 0; i <= (num_of_veyren + num_of_prodigy); i++) {
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
                        if (aggressive_thumb_strategy) {
                            copySpell()
                            for (let i = 0; i < num_of_scoundrel; i++) {
                                treasures++
                                treasures
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
                    if (aggressive_thumb_strategy) {
                        copySpell()
                        for (let i = 0; i < num_of_scoundrel; i++) {
                            treasures++
                            treasures
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
    if (num_of_veyren != 0 || num_of_prodigy != 0) {
        for (let i = 0; i <= num_of_veyren + num_of_prodigy; i++) {
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
        for (let i = 0; i < toss.length; i += num_of_thumbs + 1) {
            var chunk = toss.slice(i, i + num_of_thumbs + 1);
            toss_grouped_by_thumb.push(chunk)
        }
        all_tosses.push(toss_grouped_by_thumb)
    } else {
        all_tosses.push(toss)
    }
}

function popOff() {
    if (document.getElementById('number_of_krark').value !== '') {
        num_of_krark = parseFloat(document.getElementById('number_of_krark').value)
    }
    if (document.getElementById('number_of_veyren').value !== '') {
        num_of_veyren = parseFloat(document.getElementById('number_of_veyren').value)
    }
    if (document.getElementById('number_of_prodigy').value !== '') {
        num_of_prodigy = parseFloat(document.getElementById('number_of_prodigy').value)
    }
    if (document.getElementById('number_of_storm_kiln').value !== '') {
        num_of_storm_kiln = parseFloat(document.getElementById('number_of_storm_kiln').value)
    }
    if (document.getElementById('number_of_archmage').value !== '') {
        num_of_archmage = parseFloat(document.getElementById('number_of_archmage').value)
    }
    if (document.getElementById('number_of_bergi').value !== '') {
        num_of_bergi = parseFloat(document.getElementById('number_of_bergi').value)
    }
    if (document.getElementById('number_of_scoundrel').value !== '') {
        num_of_scoundrel = parseFloat(document.getElementById('number_of_scoundrel').value)
    }
    if (document.getElementById('number_of_thumb').value !== '') {
        num_of_thumbs = parseFloat(document.getElementById('number_of_thumb').value)
    }
    if (document.getElementById('cast_limit').value !== '') {
        cast_limit = parseFloat(document.getElementById('cast_limit').value)
    }
    if (document.querySelector('#thumb_strategy').checked) {
        aggressive_thumb_strategy = true
    }
    for (let i = 0; i < cast_limit; i++) {
        if (spell_is_back_in_hand) {
            spellCast()
        }
    }

    if (spell_is_back_in_hand) {
        var apply_effects = num_of_copies
    } else {
        var apply_effects = num_of_copies + 1
    }

    return {
        'storm_count': storm_count,
        'treasures': treasures,
        'blue_mana': blue_mana,
        'red_mana': red_mana,
        'magecraft_triggers': magecraft_plus,
        'draw_cards': draw_cards,
        'num_of_times_to_apply_effect': apply_effects,
        'spell_in_hand': spell_is_back_in_hand,
        'tosses': all_tosses,
        'copies': num_of_copies
    }
}

function displayTosses() {
    var spell_number = '1'
    var displayed_tosses = document.createElement('div')
    all_tosses.forEach(function (toss) {
        var toss_element = document.createElement('p')
        toss_element.innerHTML = 'Cast' + spell_number + ':'
        if (num_of_thumbs > 0) {
            toss.forEach(function (thumb_flips) {
                toss_element.innerHTML = toss_element.innerHTML + '[' + thumb_flips + ']'
            })
        } else {
            toss_element.innerHTML = toss_element.innerHTML + toss
        }
        displayed_tosses.appendChild(toss_element)
        spell_number++
    })
    return displayed_tosses
}

document.addEventListener('submit', (e) => {
    e.preventDefault()
    num_of_krark = parseFloat(0)
    num_of_veyren = parseFloat(0)
    num_of_prodigy = parseFloat(0)
    num_of_storm_kiln = parseFloat(0)
    num_of_archmage = parseFloat(0)
    num_of_bergi = parseFloat(0)
    num_of_scoundrel = parseFloat(0)
    num_of_thumbs = parseFloat(0)
    storm_count = parseFloat(0)
    cast_limit = parseFloat(0)
    treasures = parseFloat(0)
    blue_mana = parseFloat(0)
    red_mana = parseFloat(0)
    magecraft_plus = parseFloat(0)
    draw_cards = parseFloat(0)
    num_of_copies = parseFloat(0)
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
