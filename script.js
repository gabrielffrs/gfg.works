(function () {
    var main = document.querySelector('main');
    if (!main) return;

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    var chars = [];
    function walk(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            var text = node.textContent;
            var frag = document.createDocumentFragment();
            for (var i = 0; i < text.length; i++) {
                var span = document.createElement('span');
                span.className = 'char';
                span.textContent = text[i];
                span.style.opacity = '0';
                frag.appendChild(span);
                chars.push(span);
            }
            node.parentNode.replaceChild(frag, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            Array.prototype.slice.call(node.childNodes).forEach(walk);
        }
    }
    Array.prototype.slice.call(main.childNodes).forEach(walk);

    var cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    main.appendChild(cursor);

    var i = 0;
    var startDelay = 200;

    function tick() {
        if (i >= chars.length) {
            setTimeout(function () {
                cursor.classList.add('cursor-fade');
                cursor.addEventListener('transitionend', function () {
                    cursor.remove();
                }, { once: true });
            }, 700);
            return;
        }
        chars[i].style.opacity = '1';
        chars[i].parentNode.insertBefore(cursor, chars[i].nextSibling);
        i++;
        var delay = 4000 / 230;
        setTimeout(tick, delay);
    }

    setTimeout(tick, startDelay);
})();