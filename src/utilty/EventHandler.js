export class EventHandler {
    static debounce = (fn, delay) => {
        return (event) => {
            let timer;
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(fn(event), delay)
        }
    }
}