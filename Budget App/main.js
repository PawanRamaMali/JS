var budgetController = (function () {
    
    class Income{
        constructor(id, des, val) {
            this.Id = id;
            this.Description = des;
            this.amount = val;
        }
    }

    class Expense{
        constructor(id, des, val) {
            this.Id = id;
            this.Description = des;
            this.amount = val;
            this.percentage = -1;
        }
    }

    Expense.prototype.calculatePercenatge = function (totalIncome) {
        this.percentage = Math.round((((this.amount) / totalIncome) * 100), 3);
    };

    Expense.prototype.getPercenatge = function () {
        return this.percentage ;
    };

    function calcTotal(typ) {
        var sum = 0;
        data.allItem[typ].forEach(e => {
            sum += e.amount;
        });
        data.total[typ] = sum;
    }

    var data = {
        allItem: {
            inc: [],
            exp: []
        },
        total: {
            inc: 0,
            exp: 0
        },
        percentage:0
    };

    return {
        getAllData: function () { 
            return data;
        },
        addItem: function (typ, des, val) {
            
            var newItem, id;

            if (data.allItem[typ].length > 0) {
                id = data.allItem[typ][data.allItem[typ].length - 1].Id + 1;
            } else {
                id = 0;
            }

            if (typ == 'inc') {
                newItem = new Income(id, des, val);
            } else {
                newItem = new Expense(id, des, val);
            }
            data.allItem[typ].push(newItem);
            return newItem;
        },

        totalIncExp: function () {
            calcTotal('inc');
            calcTotal('exp');

            if (data.total.inc > 0) {
                data.percentage = Math.round((((data.total.exp) / (data.total.inc)) * 100), 3);
            } else {
                data.percentage = -1;
            }
        },

        eachProductPercentage: function () { 
            data.allItem.exp.forEach(e => {
                e.calculatePercenatge(data.total.inc);
            });
        },

        getallPercentages: function () { 
            var allpercentages = data.allItem.exp.map((e) => {
                return e.getPercenatge();
            });
            return allpercentages;
        },

        deleteItem: function (typ, id) { 
            var ids, index;
            
            ids = data.allItem[typ].map(function (e) {
                return e.Id;
            });

            index = ids.indexOf(id);
            data.allItem[typ].splice(index, 1);
    
        },

        getTotalIncExpPer: function () { 
            return {
                income: data.total.inc,
                expense: data.total.exp,
                percentage:data.percentage
            };
         }
    };

})();

var uiController = (function () {

    var allClsId = {
        sub           : '#itemSubmit',
        itemTyp       : '#typ',
        itemDes       : '#description',
        itemVal       : '#amount',
        incomeSection : '#incomeList',
        expenseSection: '#expenseList',
        month         : '#badget_month',
        totalInc      : '#total_income',
        totalExp      : '#total_expense',
        totalPErcentage: '#total_percentage',
        mainArea: '.main_area',
        percent: '.itemPercentage'
    };

    var nodeList = function (list, callback) {
        for (let i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {

        getInputVal: function () { 
            return {
                typ: document.querySelector(allClsId.itemTyp).value,
                des: document.querySelector(allClsId.itemDes).value,
                amn: parseFloat(document.querySelector(allClsId.itemVal).value)
            };
        },

        clearFields: function () { 
            var inputField;
            inputField = document.querySelectorAll(allClsId.itemDes + ',' + allClsId.itemVal);
            inputField.forEach(e => {
                e.value = '';
            });
            inputField[0].focus();
        },

        addList: function (typ, data) { 

            var htmlSec, modifyHtmlSec, parentElement;

            if (typ == 'inc') {

                parentElement = allClsId.incomeSection;

                htmlSec = '<div class="row hovereffect border-bottom" id="inc-%id%"><div class="col-sm-9 offset-sm-1 m-1 itemDescription">%itemDescription%</div><div class="col-xm-6 m-1 itemVal" >%itemVal%</div><div class="col-xm-2 m-1 itemDel"><i class="far fa-times-circle delete_btn"></i></div></div>';
            } else {

                parentElement = allClsId.expenseSection;

                htmlSec = '<div class="row hovereffect border-bottom" id="exp-%id%"><div class="col-sm-8 offset-sm-1 m-1 itemDescription">%itemDescription%</div><div class="col-xm-6 m-1 itemVal">%itemVal%</div><div class="col-xm-6 m-1"><span class="badge badge-pill badge-primary itemPercentage">0</span></div><div class="col-xm-2 m-1 itemDel"><i class="far fa-times-circle delete_btn"></i></div></div>'; 
            }

            modifyHtmlSec = htmlSec.replace('%id%', data.Id);
            modifyHtmlSec = modifyHtmlSec.replace('%itemDescription%', data.Description);
            modifyHtmlSec = modifyHtmlSec.replace('%itemVal%', data.amount);

            if (data.Description == '' || data.amount == 0) {
                // do nothing
            } else {
                document.querySelector(parentElement).insertAdjacentHTML('beforeend', modifyHtmlSec);
            }
        },

        deleteList: function (itemId) { 
            var theItem;
            theItem = document.getElementById(itemId);
            theItem.parentNode.removeChild(theItem);
         },

        finalIncome: function (inc) {
            document.querySelector(allClsId.totalInc).textContent = inc;
        },

        dispalyPercentage: function (percentage) { 
            var fields;

            fields = document.querySelectorAll(allClsId.percent);
            nodeList(fields, function (curr, ind) {
                if (percentage[ind] > 0) {
                    curr.textContent = percentage[ind] + '%';
                } else {
                    curr.textContent = '-';
                }
            });
        },

        ClsId: function () {
            return allClsId;
        }
    };
})();

var controller = (function (bController, uController) {

    var myClsIds = uController.ClsId();

    function currentMonth() {
        var date = new Date();
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var currMonth = months[date.getMonth()];
        var currYear  = date.getFullYear();
        var currDate = date.getDate(); 
        document.querySelector(myClsIds.month).textContent = currDate + ' ' + currMonth + ' ' + currYear;
    }

    function totalIncomeExpensePercentage() {
        bController.totalIncExp();
        var allInfo = bController.getTotalIncExpPer();

        document.querySelector(myClsIds.totalInc).textContent = allInfo.income;
        document.querySelector(myClsIds.totalExp).textContent = allInfo.expense;
        document.querySelector(myClsIds.totalPErcentage).textContent = allInfo.percentage + '%';
    }

    function calcPercentage() {
        bController.eachProductPercentage();
        var percent = bController.getallPercentages();
        uController.dispalyPercentage(percent);
    }

    function ctrlAddItem() {

        // getData
        var items = uController.getInputVal();

        // send it to budgetcontroller
        var newItem = bController.addItem(items.typ, items.des, items.amn);
        
        // pass to uicontroler to show
        uController.addList(items.typ, newItem);

        // null the inputField
        uController.clearFields();

        // total income,expense,percentage
        totalIncomeExpensePercentage();
        calcPercentage();

    }

    var ctrlDelItem = function (e) {
        var itemId, id, typ, idTyp;

        itemId = e.target.parentNode.parentNode.id;
        idTyp = itemId.split('-');
        typ = idTyp[0];
        id = parseInt(idTyp[1]);

        bController.deleteItem(typ, id);
        uController.deleteList(itemId);
        totalIncomeExpensePercentage();
        calcPercentage();

    };

    var allEventListener = function () {
        document.querySelector(myClsIds.sub).addEventListener('click', ctrlAddItem);
        document.querySelector(myClsIds.mainArea).addEventListener('click', ctrlDelItem);
    };

    return {
        initialize: function () {
            console.log('app is initialized');
            currentMonth();
            allEventListener();
        }
    };

})(budgetController, uiController);

controller.initialize();
