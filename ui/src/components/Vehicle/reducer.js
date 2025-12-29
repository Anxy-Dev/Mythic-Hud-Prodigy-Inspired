export const initialState = {
    showing: false,
    ignition: true,
    speed: 0,
    speedMeasure: 'MPH',
    seatbelt: false,
    seatbeltHide: false,
    cruise: false,
    checkEngine: false,
    fuel: null,
    fuelHide: false,
    engineHealth: 100,
    engineHealthHide: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_VEHICLE':
            return {
                ...state,
                showing: true,
                fuel: state.fuel !== null ? state.fuel : null, // Preserve fuel, don't reset to 100
            };
        case 'HIDE_VEHICLE':
            return {
                ...state,
                showing: false,
            };
        case 'UPDATE_IGNITION':
            return {
                ...state,
                ignition: action.payload.ignition,
            };
        case 'UPDATE_SPEED':
            return {
                ...state,
                speed: action.payload.speed,
            };
        case 'UPDATE_SPEED_MEASURE':
            return {
                ...state,
                speedMeasure: action.payload.measurement,
            };
        case 'UPDATE_SEATBELT':
            return {
                ...state,
                seatbelt: action.payload.seatbelt,
            };
        case 'SHOW_SEATBELT':
            return {
                ...state,
                seatbeltHide: false,
            };
        case 'HIDE_SEATBELT':
            return {
                ...state,
                seatbeltHide: true,
            };
        case 'UPDATE_CRUISE':
            return {
                ...state,
                cruise: action.payload.cruise,
            };
        case 'UPDATE_ENGINELIGHT':
            return {
                ...state,
                checkEngine: action.payload.checkEngine,
            };
        case 'UPDATE_FUEL':
            return {
                ...state,
                fuel: typeof(action.payload.fuel) === 'number' ? action.payload.fuel : state.fuel,
                fuelHide: typeof(action.payload.fuelHide) === 'boolean'
                    ? action.payload.fuelHide
                    : false
            };
        case 'SHOW_FUEL':
            return {
                ...state,
                fuelHide: false,
            };
        case 'HIDE_FUEL':
            return {
                ...state,
                fuelHide: true,
            };
        case 'UPDATE_ENGINE_HEALTH':
            return {
                ...state,
                engineHealth: action.payload.engineHealth,
            };
        case 'SHOW_ENGINE_HEALTH':
            return {
                ...state,
                engineHealthHide: false,
            };
        case 'HIDE_ENGINE_HEALTH':
            return {
                ...state,
                engineHealthHide: true,
            };
        case 'SHOW_HUD':
            // Don't reset vehicle state on SHOW_HUD
            return state;
        default:
            return state;
    }
};
