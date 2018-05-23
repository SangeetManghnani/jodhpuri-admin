import $ from 'jquery';

console.log('hello');

var category = {
    addCategoryBtn: $('#add-subcat'),
    init: function() {
        console.log(addCategoryBtn);
        $(addSubcategory).bind('click', category.addCategory);
    },
    addCategory: function() {
        console.log('hello');
    }
}

category.init();

// export class Category {
//     constructor() {
//         console.log('hello');
//         $('#add-subcat').bind("click", Category.addSubcategory);
//     }
//     addSubcategory() {
//         const toAppend = $('.sub-cat-container').children().first();
//         $('.sub-cat-container').append(toAppend);
//     }
// }

// const Cat = new Category;