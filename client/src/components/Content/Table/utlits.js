export function getBgc(state) {
    switch (state) {
        case -1:
        return '#5BC648'
        case 0:
            return '#d8db27'
        case 1:
            return '#e3e4e5'

    }
}
export function getBoxInfo(state) {
    switch (state) {
        case -1:
        return '空闲'
        case 0:
            return '仍可预约'
        case 1:
            return '已满'

    }
}
export function getPeriods(state) {
    switch (state) {
        case 0:
            return ['12:00~14:00']
        case 1:
            return ['10:00~12:00',
                '12:00~14:00',
                '14:00~16:00']

    }
}

export function getFieldName(state) {
    switch (state) {
        case 'xc':
        return '西操'
        case 'zc':
            return '中操'
        case 'dc':
            return '东操'

    }
}