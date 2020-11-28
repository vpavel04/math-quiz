const generateOptions = (equations, bodyTable, polyglot) => {
    Object.keys(equations).forEach( category => {
        const htmlCategory = generateCategory(category, bodyTable, polyglot);
        Object.keys(equations[category]).forEach( option => {
            const htmlOption = generateOption(option, category, polyglot);
            htmlCategory.append(htmlOption);
        });
    });

};

const generateCategory = (categoryName, tableBody, polyglot) => {
    const category = $("<tr></tr>");
    const toggle = $(`
    <td>
        <div class="custom-control custom-switch">
        <input type="checkbox" checked="" state="true" class="custom-control-input" id="${categoryName}">
        <label class="custom-control-label" for="${categoryName}"></label>
        </div>
    </td>`);

    category.append(toggle);
    
    const optionsContainer = $("<td></td>");
    category.append(optionsContainer);
    tableBody.append(category);

    return optionsContainer;
};

const generateOption = (optionName, category, polyglot) => {
    const id = `${category}.${optionName}`;
    return $(`
    <div class="custom-control custom-switch">
        <input type="checkbox" checked="" state="true" class="custom-control-input" id="${id}">
        <label class="custom-control-label" for="${id}">${polyglot.t("quiz.math." + category + "." + optionName + ".description")}</label>
    </div>`);
};