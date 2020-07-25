const getPath = require('./script');
//Тестовая html страница
var a =
    '<body>'+
    '<div class="first_div" style="border: 1px solid black">' +
    '<div id="test_div"  class="radio_buttons">' +
    '<div class="some_text">Some text' +
    '<article>Article</article>' +
    '</div>' +
    '<input type="radio" name="test" id="751" checked>' +
    '<p class="paragraph">Paragraph</p>' +
    '<p class="paragraph1">Paragraph</p>' +
    '<div>'+
    '<p class="paragraph2">Paragraph</p>'+
    '<p class="paragraph3">Paragraph</p>'+
    '</div>'+
    '</div></div>'+
    '</body>';

var html = document.createElement('html');
html.innerHTML = a;

test('getPath should return #test_div>DIV:nth-child(5)>P:nth-child(2)', () => {
    console.log(html.innerHTML);
    const result = getPath(html.querySelector('.paragraph3'));
    expect(result).toBe('#test_div>DIV:nth-child(5)>P:nth-child(2)');
});

test('getPath should return #test_div>DIV', () => {
    console.log(html.innerHTML);
    const result = getPath(html.querySelector('.some_text'));
    expect(result).toBe('#test_div>DIV:nth-child(1)');
});

test('getPath should return #test_div', () => {
    console.log(html.innerHTML);
    const result = getPath(html.querySelector('.radio_buttons'));
    expect(result).toBe('#test_div');
});

test('getPath should return BODY>DIV', () => {
    console.log(html.innerHTML);
    const result = getPath(html.querySelector('.first_div'));
    expect(result).toBe('BODY>DIV');
});
test('getPath should return BODY', () => {
    console.log(html.innerHTML);
    const result = getPath(html.querySelector('BODY'));
    expect(result).toBe('BODY');
});
