-- Hunger and Water Commands for Testing
RegisterCommand('sethunger', function(source, args)
    local hunger = tonumber(args[1]) or 100
    if hunger < 0 then hunger = 0 end
    if hunger > 100 then hunger = 100 end
    
    -- Send to NUI to update Redux state
    SendNUIMessage({
        action = 'UPDATE_NEEDS',
        hunger = hunger
    })
    
    TriggerEvent('chat:addMessage', {
        color = {0, 255, 0},
        multiline = true,
        args = {"System", "Hunger set to " .. hunger .. "%"}
    })
end, false)

RegisterCommand('setwater', function(source, args)
    local water = tonumber(args[1]) or 100
    if water < 0 then water = 0 end
    if water > 100 then water = 100 end
    
    -- Send to NUI to update Redux state
    SendNUIMessage({
        action = 'UPDATE_NEEDS',
        thirst = water
    })
    
    TriggerEvent('chat:addMessage', {
        color = {0, 255, 0},
        multiline = true,
        args = {"System", "Water set to " .. water .. "%"}
    })
end, false)

RegisterCommand('setboost', function(source, args)
    local boost = tonumber(args[1]) or 0
    local hasBoost = boost > 0
    
    -- Send to NUI to update Redux state
    SendNUIMessage({
        action = 'UPDATE_BOOST',
        hasBoost = hasBoost,
        boostTime = boost
    })
    
    TriggerEvent('chat:addMessage', {
        color = {0, 255, 0},
        multiline = true,
        args = {"System", "Boost " .. (hasBoost and "enabled" or "disabled")}
    })
end, false)

