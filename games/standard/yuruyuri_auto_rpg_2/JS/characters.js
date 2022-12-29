export class Character {
    constructor(firstName, surname) {
        this.firstName = firstName;
        this.surname = surname;
    }

    createUI() {
        this.addToCharacterMainNav();
        this.createCharacterVerticalNav();
    }

    addToCharacterMainNav() {
        this.createEntries([this.firstName], 
                           "characterNav", 
                           "characterNavItemContainer", 
                           "characterNavButton", 
                           "characterNavTabContentContainer", 
                           "characterNavTabContent",
                           false);
    }

    createCharacterVerticalNav() {
        //Create container for nav
        jQuery('<div>', {
            id: `${this.firstName.toLowerCase()}VertCharNavContainer`,
            class: 'd-flex align-items-start',
        }).appendTo(`#pills-${this.firstName.toLowerCase()}`);

        //Create vertical nav
        jQuery('<ul>', {
            id: `${this.firstName.toLowerCase()}VertCharNav`,
            class: 'nav flex-column nav-pills me-3',
            role: "tablist",
        }).appendTo(`#${this.firstName.toLowerCase()}VertCharNavContainer`);
        $(`#${this.firstName.toLowerCase()}VertCharNav`).attr("aria-orientation", "vertical");

        //Create tab content container
        jQuery('<div>', {
            id: `${this.firstName.toLowerCase()}TabContentContainer`,
            class: 'tab-content border rounded',
        }).appendTo(`#${this.firstName.toLowerCase()}VertCharNavContainer`);

        this.createEntries(["General", "Fart"], 
                            `${this.firstName.toLowerCase()}VertCharNav`, 
                            "VertNavItemContainer", 
                            "VertNavButton", 
                            `${this.firstName.toLowerCase()}TabContentContainer`, 
                            "VertNavTabContent",
                            true);
    }

    createEntries(tabNames, containerParentID, containerID, navButtonID, tabContentParentID, tabContentID, startActive) {
        //Creates tab and tab button for each item in tabNames array.
        for(let i = 0; i < tabNames.length; i++) {
            let active = false;
            if(i === 0 && startActive === true) {
                active = true;
            }
            this.createCharNavItemContainer(tabNames[i], containerParentID, containerID);
            this.createCharVertNavButton(tabNames[i], containerID, navButtonID, tabContentID, active);
            this.createCharVertNavTabContent(tabNames[i], tabContentParentID, tabContentID, navButtonID, active);
        }
    }

    createCharNavItemContainer(tabName, parentID, id) {
        //Creates nav-item container for button in navbar
        jQuery('<li>', {
            id: `${this.firstName.toLowerCase()}${tabName}${id}`,
            class: 'nav-link',
            role: "tab",
            type: "button",
        }).appendTo(`#${parentID}`);
    }

    createCharVertNavButton(tabName, parentID, id, tabID, active = false) {
        //Creates Button for the vertical navigation bar in character panel.
        jQuery('<button>', {
            id: `${this.firstName.toLowerCase()}${tabName}${id}`,
            class: 'nav-link',
            role: "tab",
            type: "button",
        }).appendTo(`#${this.firstName.toLowerCase()}${tabName}${parentID}`);
        $(`#${this.firstName.toLowerCase()}${tabName}${id}`).attr("data-bs-toggle", "pill");
        $(`#${this.firstName.toLowerCase()}${tabName}${id}`).attr("data-bs-target", `#${this.firstName.toLowerCase()}${tabName}${tabID}`);
        $(`#${this.firstName.toLowerCase()}${tabName}${id}`).text(tabName);

        if(active === true) {
            $(`#${this.firstName.toLowerCase()}${tabName}${id}`).addClass("active");
        }
    }

    createCharVertNavTabContent(tabName, parentID, id, buttonID, active = false) {
        //Creates content tab for the vertical navigation bar in character panel.
        jQuery('<div>', {
            id: `${this.firstName.toLowerCase()}${tabName}${id}`,
            class: 'tab-pane fade',
            role: "tabpanel",
            tabindex: "0",
        }).appendTo(`#${parentID}`);
        $(`#${this.firstName.toLowerCase()}${tabName}${id}`).attr("aria-labelledby", `${this.firstName.toLowerCase()}${tabName}${buttonID}`);
        $(`#${this.firstName.toLowerCase()}${tabName}${id}`).text(tabName);

        if(active === true) {
            $(`#${this.firstName.toLowerCase()}${tabName}${id}`).addClass("show");
            $(`#${this.firstName.toLowerCase()}${tabName}${id}`).addClass("active");
        }
    }
}