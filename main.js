// ---------------------------------------- Logic xử lí thao tác trên calc-section
// ------------------ Get DOM Elements
// ---- Date report-section
const reportSectionDate = document.querySelector(".report-section span.date");

// Lấy dữ liệu ngày / tháng / năm
let date = new Date();
let currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
reportSectionDate.innerHTML = currentDate;

// ---- REVENUE FORM
let revForm = document.querySelector(".calc-section .form.rev");

let revForm_Btn = revForm.querySelector(".form-submit button");

let revForm_BowlCount_Input = revForm.querySelector("input.bowl-count");
let bowlCountErr = revForm.querySelector("input.bowl-count + .error-message");

let revForm_BowlPrice_Input = revForm.querySelector("input.bowl-price");
let bowlPriceErr = revForm.querySelector("input.bowl-price + .error-message");


// ---- COSTS FORM
let costsForm = document.querySelector(".calc-section .form.costs");

let costsForm_Btn = costsForm.querySelector(".form-submit button");

let costsForm_Ingr_Input = costsForm.querySelector("input.ingr");
let ingrErr = costsForm.querySelector("input.ingr + .error-message");

let costsForm_IngrCost_Input = costsForm.querySelector("input.ingr-cost");
let ingrCostErr = costsForm.querySelector("input.ingr-cost + .error-message");


// ---- reportSection
let reportSection = document.querySelector(".report-section");

let bowlCountContainer = reportSection.querySelector(".bowl-count .data");
let revContainer = reportSection.querySelector(".rev .data");
let costsTable = reportSection.querySelector(".costs .table .ingr-list");
let totalCostContainer = reportSection.querySelector(".total-cost .data")
let profitContainer = reportSection.querySelector(".profit .data")

// tạo biến data global
let bowlCountData = 0;
let totalBowlCountData = 0;
let bowlPriceData;

let revData = 0;
let totalRevData = 0;

let profitData = 0;

let ingrData;
let ingrCostData;
let totalCostData = 0;  // biến cộng dồn dữ liệu chi phí nguyên liệu làm tổng chi phí

// Xử lí lỗi nhập
function handleEmptyInput(input, errEl) {
    if (input.value === "") {
        errEl.innerHTML = "Vui lòng nhập thông tin";
        return true
    } else {
        errEl.innerHTML = "";
        return false
    }
};

function handleFloat(input, errEl) {
    if (input.value.includes(",")) {
        input.value = input.value.replace(",", ".");
        console.log(input.value);
    } 
    if (Number.isFinite(+(input.value))) {
        errEl.innerHTML = "";
        return true
    } else {
        errEl.innerHTML = "Chỉ được nhập số";
        return false
    }
};

function handlePositiveFloat(input, errEl) {
    if (+(input.value) >= 0) {
        errEl.innerHTML = "";
        return true
    } else {
        errEl.innerHTML = "Yêu cầu dữ liệu dương";
        return false
    }
};

// Xử lí sự kiện của các calcForm
revForm_Btn.onclick = function() {
    const isBowlCountEmpty = handleEmptyInput(revForm_BowlCount_Input, bowlCountErr);
    const isBowlPriceEmpty = handleEmptyInput(revForm_BowlPrice_Input, bowlPriceErr);
    
    if (!isBowlCountEmpty && !isBowlPriceEmpty) {
        const isBowlCountFloat = handleFloat(revForm_BowlCount_Input, bowlCountErr);
        const isBowlPriceFloat = handleFloat(revForm_BowlPrice_Input, bowlPriceErr);

        if (isBowlCountFloat && isBowlPriceFloat) {
            const isBowlCountPositive = handlePositiveFloat(revForm_BowlCount_Input, bowlCountErr);
            const isBowlPricePositive = handlePositiveFloat(revForm_BowlPrice_Input, bowlPriceErr);
    
            if (isBowlCountPositive && isBowlPricePositive) {
                bowlCountData = +(revForm_BowlCount_Input.value);
                totalBowlCountData += +(revForm_BowlCount_Input.value);
                bowlPriceData = +(revForm_BowlPrice_Input.value);
                revData = bowlCountData * bowlPriceData;
                totalRevData += revData;

                // Khắc phục lỗi số học dấu phẩy động
                bowlCountData.toFixed(1);
                totalBowlCountData.toFixed(1);
                bowlPriceData.toFixed(1);
                revData.toFixed(1);
                totalRevData.toFixed(1);
            
                revForm_BowlCount_Input.value = "";
                revForm_BowlPrice_Input.value = "";
                
                bowlCountContainer.innerHTML = `${totalBowlCountData} tô`;
                revContainer.innerHTML = `${totalRevData}k`;
            
                profitData += revData;
                profitContainer.innerHTML = `${profitData}k`;
            };
        };
    };
};

costsForm_Btn.onclick = function() {
    const isIngrEmpty = handleEmptyInput(costsForm_Ingr_Input, ingrErr)
    const isIngrCostEmpty = handleEmptyInput(costsForm_IngrCost_Input, ingrCostErr);

    if (!isIngrEmpty && !isIngrCostEmpty) {
        const isIngrCostFloat = handleFloat(costsForm_IngrCost_Input, ingrCostErr);
        
        if (isIngrCostFloat) {
            const isIngrCostPositive = handlePositiveFloat(costsForm_IngrCost_Input, ingrCostErr);
    
            if (isIngrCostPositive) {
                ingrData = costsForm_Ingr_Input.value;
                ingrCostData = +(costsForm_IngrCost_Input.value);
                totalCostData += ingrCostData;
            
                costsForm_Ingr_Input.value = "";
                costsForm_IngrCost_Input.value = "";
                
                costsTable.innerHTML += 
                    `<div class="line">
                        <span class="material">${ingrData}</span>
                        <div class="group">
                            <span class="price-data">${ingrCostData}k</span>
                            <i class="fa-solid fa-pen icon" script="test()"></i>
                        </div>
                    </div>`;
            
                totalCostContainer.innerHTML = `${totalCostData}k`;
            
                profitData -= ingrCostData;
                profitContainer.innerHTML = `${profitData}k`;
            };
        }
    };
};

// ------------------------------------------ Logic xử lí thao tác trên report-section (+ xử lí modal)
// ---------------------- Get DOM elements
    // bowlCountContainer
const editIcon = document.querySelectorAll(".report-section .line .icon");
function test() {
    editIcon.forEach(icon => {
        console.log(icon);
    })
};