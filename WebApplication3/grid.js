$(function () {
    var clients = [
        { "ID": 1, "RegisterDate": 0, "Time": "12:45", "Name": "vasya", "Note": "Buy bread" },
        { "ID": 2, "RegisterDate": 0, "Time": "12:46", "Name": "vasya", "Note": "Buy bread" },
        { "ID": 3, "RegisterDate": 0, "Time": "12:48", "Name": "vasya", "Note": "Buy bread" },
        { "ID": 4, "RegisterDate": 0, "Time": "12:49", "Name": "vasya", "Note": "Buy bread" },
        { "ID": 5, "RegisterDate": 0, "Time": "12:50", "Name": "vasya", "Note": "Buy bread" },
    ];
    var myDateField = function (config) {
        jsGrid.Field.call(this, config);
    };

    myDateField.prototype = new jsGrid.Field({
        sorter: function (date1, date2) {
            return new Date(date1) - new Date(date2);
        },

        itemTemplate: function (value) {
            return new Date(value).toDateString();
        },

        insertTemplate: function (value) {
            return this._insertPicker = $("<input>").datepicker({ defaultDate: new Date() });
        },

        editTemplate: function (value) {
            return this._editPicker = $("<input>").datepicker().datepicker("setDate", new Date(value));
        },

        insertValue: function () {
            return this._insertPicker.datepicker("getDate").toISOString();
        },

        editValue: function () {
            return this._editPicker.datepicker("getDate").toISOString();
        }
    });

    jsGrid.fields.myDateField = myDateField;

    $("#jsGrid").jsGrid({
        height: "90%",
        width: "100%",

        inserting: true,
        editing: true,
        sorting: true,
        paging: true,

        data: clients,

        fields: [
            { name: "ID", type: "number", width: 50 },
            { name: "RegisterDate", type: "myDateField", width: 100, align: "center" },
            { name: "Time", type: "number", width: 50 },
            { name: "Name", type: "text", width: 150, validate: "required" },
            { name: "Note", type: "text", width: 200 },
            { type: "control", editButton: false, modeSwitchButton: false }
        ]
    });

});