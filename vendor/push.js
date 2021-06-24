class Push {
    constructor (...props) {
        this.r = props[3] || Math.random().toString(36).slice(2);
        if (props[0] == undefined || props[1] == undefined) {
            throw 'Ошибка создания Push-уведомления на сайте';
        }
        else {
            $('body').prepend(`
                <div class="push-wrapper push-wrapper-${this.r}">
                    <div class="push-main-${props[0]} push-main-${this.r}">
                        <p class="push-message push-message-${this.r}">${props[1]}</p>
                    </div>
                </div>
            `);
            $(`.push-wrapper-${this.r}`).animate({'opacity': '1'}, 300);
            setTimeout(() => {
                if ($(`.push-wrapper-${this.r}`).length != 0) {
                    $(`.push-wrapper-${this.r}`).animate({'opacity': '0'}, 300);
                    setTimeout(() => { $(`.push-wrapper-${this.r}`).remove() }, 300);
                }
            }, 1500);
        }
    }
}
module.exports = Push;