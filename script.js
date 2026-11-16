"use strict";

const billAmt = document.querySelector("#bill-input");
const customTip = document.querySelector("#custom-tip");
const peopleCountEle = document.querySelector("#people-count");
const genBillBtn = document.querySelector(".bill-calc-btn");
const resetBtn = document.querySelector(".bill-reset-btn");

const tipBtns = document.querySelectorAll(".tip-btn input");
const tipLabels = document.querySelectorAll(".tip-btn label");

const invoiceFields = document.querySelectorAll(".pr-bill, .pr-tip, .pr-total-bill, .pr-each-share, .pr-person-nos");

const rupeeSymbol = "₹";

const printBillAmt = document.querySelector(".pr-bill");
const printTipAmt = document.querySelector(".pr-tip");
const printTotalAmt = document.querySelector(".pr-total-bill");
const printEachShare = document.querySelector(".pr-each-share");
const printPersonNos = document.querySelector(".pr-person-nos");

function activeGenBillBtn() {
        if(+peopleCountEle.value && +billAmt.value) {
                genBillBtn.disabled = false;
        } else{
                genBillBtn.disabled = true;
        }
}

function returnSelTipBtn() {
        return document.querySelector("input[name=tip-rate]:checked");
}

//
debugger
const emptyList = [];

emptyList.forEach((listItem) => {
        console.log(listItem, "???");
});

// enable/disable tip btns, custom tip, and people count on input event at bill amt

billAmt.addEventListener("input", () => {
        if(+billAmt.value){
                [...tipBtns, customTip, peopleCountEle].forEach((item) => {
                        item.disabled = false;
                });
                
                activeGenBillBtn(); 

        } else{
                [...tipBtns, customTip, peopleCountEle].forEach((item) => {
                        item.disabled = true;
                });
                activeGenBillBtn(); 
        }
});

// method-1: clear custom tip input on click event at tip buttons and making the radio btn toggleable 

tipBtns.forEach((tipBtn) => {
        
        let isChecked = false;

        tipBtn.nextElementSibling.addEventListener("mousedown", () => {
                if(!tipBtn.disabled) {
                        isChecked = tipBtn.checked;
                }
        });

        tipBtn.addEventListener("click", () => {
                customTip.value = "";
                if(isChecked) {
                        tipBtn.checked = false;
                }
        });
});

// method-2: clear custom tip input on click event at tip buttons and making the radio btn toggleable

/*
let checkedTipEle = null;

tipBtns.forEach((tipBtn) => {

        tipBtn.addEventListener("click", () => {
                customTip.value = "";                
                if(checkedTipEle === tipBtn) {
                        tipBtn.checked = false;
                        checkedTipEle = null;
                } else {
                        checkedTipEle = tipBtn;
                }
        });

});
*/

// clear tip btn selection and simultaneously run active bill gen button function on input event at custom tip

customTip.addEventListener("input", () => {
        const selectedTipEle = returnSelTipBtn();

        if(selectedTipEle) {
                selectedTipEle.checked = false;
        }
        
        activeGenBillBtn();
});

// run active bill gen button function on input event at people count

peopleCountEle.addEventListener("input", () => {
        activeGenBillBtn();
});

// calculate & print tip amt, total bill, each share amt and enable reset button on click event at gen bill button

genBillBtn.addEventListener("click", () => {
        
        const selectedTipEle = returnSelTipBtn();

        const selTipRate = selectedTipEle? +selectedTipEle.value : +customTip.value;

        const tipAmt = +billAmt.value * (selTipRate/100);
        const totalBill = +billAmt.value + tipAmt;
        const eachShareAmt = totalBill / +peopleCountEle.value;

        printBillAmt.textContent = `${rupeeSymbol} ${Math.round(billAmt.value)}`;
        printTipAmt.textContent = `${rupeeSymbol} ${Math.round(tipAmt)}`;
        printTotalAmt.textContent = `${rupeeSymbol} ${Math.round(totalBill)}`;
        printPersonNos.textContent = `${Math.round(peopleCountEle.value)}`;
        printEachShare.textContent = `${rupeeSymbol} ${Math.floor(eachShareAmt)}`;
        
        resetBtn.disabled = false;

});

// set to initial value for bill amt, tip button, custom tip, and people count
// set to initial content for invoice fields
// disable tip buttons, custom tip, people count, gen bill btn, and reset btn

resetBtn.addEventListener("click", () => {

        billAmt.value = "";
        
        const selectedTipEle = returnSelTipBtn();

        if(selectedTipEle) {
                selectedTipEle.checked = false;
        }

        customTip.value = "";
        peopleCountEle.value = "";

        invoiceFields.forEach((field) => {
                field.textContent = "---";
        });

        [...tipBtns, customTip, peopleCountEle, genBillBtn, resetBtn].forEach((item) => {
                item.disabled = true;
        });

});


