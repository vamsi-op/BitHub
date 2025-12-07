// State
let num1 = 0;
let num2 = 0;
let animationTimeout = null;
let currentMode = 'and';
let variableCount = 2; // Start with A and B
let selectedVar1 = 1; // Default to A
let selectedVar2 = 2; // Default to B
let currentResult = 0; // Store current operation result

// Variable Management
function addVariable() {
    variableCount++;
    const varName = String.fromCharCode(64 + variableCount); // C, D, E, etc.
    const inputId = `number${variableCount}`;
    const binaryId = `binary${variableCount}`;
    
    const container = document.getElementById('variables-container');
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';
    inputGroup.setAttribute('data-var', varName);
    inputGroup.innerHTML = `
        <label for="${inputId}">${varName} :</label>
        <input type="number" id="${inputId}" value="0" min="-2147483648" max="2147483647">
        <button class="negate-btn" onclick="negateVariable('${inputId}')" title="Negate (NOT)">~</button>
        <div class="binary-display" id="${binaryId}" data-number="${variableCount}"></div>
    `;
    container.appendChild(inputGroup);
    
    // Add event listener to the new input
    document.getElementById(inputId).addEventListener('input', function() {
        const value = parseInt(this.value) || 0;
        // Store value in global variables for bit size calculation
        window[`num${variableCount}`] = value;
        updateBinaryDisplay(value, variableCount);
        updateCurrentOperation();
    });
    
    // Initialize binary display
    window[`num${variableCount}`] = 0;
    updateBinaryDisplay(0, variableCount);
    updateRemoveButtonVisibility();
    updateVariableSelectors();
}

function removeLastVariable() {
    
    const container = document.getElementById('variables-container');
    const lastGroup = container.querySelector(`.input-group[data-var="${String.fromCharCode(64 + variableCount)}"]`);
    
    if (lastGroup) {
        lastGroup.remove();
        delete window[`num${variableCount}`];
        variableCount--;
        updateRemoveButtonVisibility();
        updateVariableSelectors();
        
        // Reset selection if it was pointing to removed variable
        if (selectedVar1 > variableCount) selectedVar1 = variableCount;
        if (selectedVar2 > variableCount) selectedVar2 = variableCount;
        
        updateCurrentOperation();
    }
}

function updateRemoveButtonVisibility() {
    const removeBtn = document.querySelector('button[onclick="removeLastVariable()"]');
    if (removeBtn) {
        if (variableCount <= 2) {
            removeBtn.style.display = 'none';
        } else {
            removeBtn.style.display = 'block';
        }
    }
}

function updateVariableSelectors() {
    const select1 = document.getElementById('var-select-1');
    const select2 = document.getElementById('var-select-2');
    
    if (!select1 || !select2) return;
    
    // Store current selections
    const currentVal1 = select1.value;
    const currentVal2 = select2.value;
    
    // Clear and rebuild options
    select1.innerHTML = '';
    select2.innerHTML = '';
    
    for (let i = 1; i <= variableCount; i++) {
        const varName = String.fromCharCode(64 + i);
        
        const option1 = document.createElement('option');
        option1.value = i;
        option1.textContent = varName;
        if (i == currentVal1) option1.selected = true;
        select1.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = i;
        option2.textContent = varName;
        if (i == currentVal2) option2.selected = true;
        select2.appendChild(option2);
    }
}

function negateResult() {
    const negated = ~currentResult;
    // Update the result display
    const bitSize = getBitSize(window[`num${selectedVar1}`] || 0, window[`num${selectedVar2}`] || 0);
    const binaryResult = toBinary(negated, bitSize);
    
    document.getElementById('operation-result').innerHTML = highlightResultBits(binaryResult);
    document.getElementById('operation-decimal').textContent = negated;
    
    currentResult = negated;
    animateElement(document.getElementById('operation-result'));
}

function storeResult() {
    // Create a new variable with the current result
    addVariable();
    
    // Set the new variable's value to the result
    const newVarId = `number${variableCount}`;
    const newVarInput = document.getElementById(newVarId);
    
    if (newVarInput) {
        newVarInput.value = currentResult;
        window[`num${variableCount}`] = currentResult;
        updateBinaryDisplay(currentResult, variableCount);
        
        animateElement(newVarInput.closest('.input-group'));
    }
}

function removeVariable(button) {
    const inputGroup = button.closest('.input-group');
    if (inputGroup && document.querySelectorAll('.input-group').length > 2) {
        const varName = inputGroup.getAttribute('data-var');
        const charCode = varName.charCodeAt(0);
        const varIndex = charCode - 64;
        
        inputGroup.remove();
        delete window[`num${varIndex}`];
        
        // Update variable count if removing the last one
        if (varIndex === variableCount) {
            variableCount--;
        }
        updateCurrentOperation();
    } else {
        alert('You must have at least 2 variables!');
    }
}

function negateVariable(inputId) {
    const input = document.getElementById(inputId);
    const currentValue = parseInt(input.value) || 0;
    const negatedValue = ~currentValue;
    input.value = negatedValue;
    
    // Trigger input event to update display
    input.dispatchEvent(new Event('input'));
}

function updateBinaryDisplay(value, numberIndex) {
    const num = parseInt(value) || 0;
    const binaryId = `binary${numberIndex}`;
    const binaryDisplay = document.getElementById(binaryId);
    
    if (binaryDisplay) {
        // Get all current variable values for bit size calculation
        const allValues = [];
        for (let i = 1; i <= variableCount; i++) {
            const val = parseInt(document.getElementById(`number${i}`)?.value) || 0;
            allValues.push(Math.abs(val));
        }
        const maxNum = Math.max(...allValues);
        
        // Determine bit size based on max value
        let bitSize = 8;
        if (maxNum > 255) bitSize = 16;
        if (maxNum > 65535) bitSize = 32;
        
        const binary = toBinary(num, bitSize);
        binaryDisplay.innerHTML = toBinaryDisplay(binary);
        setupBinaryInputListenersForElement(binaryDisplay);
    }
    
    // Update all other displays to match the same bit size
    updateAllBinaryDisplays();
}

function updateAllBinaryDisplays() {
    // Get all current variable values for bit size calculation
    const allValues = [];
    for (let i = 1; i <= variableCount; i++) {
        const input = document.getElementById(`number${i}`);
        if (input) {
            const val = parseInt(input.value) || 0;
            allValues.push(Math.abs(val));
            window[`num${i}`] = val; // Store in global
        }
    }
    const maxNum = Math.max(...allValues);
    
    // Determine bit size
    let bitSize = 8;
    if (maxNum > 255) bitSize = 16;
    if (maxNum > 65535) bitSize = 32;
    
    // Update all binary displays
    for (let i = 1; i <= variableCount; i++) {
        const input = document.getElementById(`number${i}`);
        const binaryDisplay = document.getElementById(`binary${i}`);
        
        if (input && binaryDisplay) {
            const val = parseInt(input.value) || 0;
            const binary = toBinary(val, bitSize);
            
            // Remove old bit size classes
            binaryDisplay.classList.remove('bits-8', 'bits-16', 'bits-32');
            // Add new bit size class
            binaryDisplay.classList.add(`bits-${bitSize}`);
            
            binaryDisplay.innerHTML = toBinaryDisplay(binary);
            setupBinaryInputListenersForElement(binaryDisplay);
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Input listeners
    document.getElementById('number1').addEventListener('input', handleNum1Change);
    document.getElementById('number2').addEventListener('input', handleNum2Change);
    
    // Binary input listeners (setup after DOM is ready)
    setupBinaryInputListeners();
    
    // Mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
            // Update mode
            currentMode = e.target.dataset.mode;
            // Update display
            updateCurrentOperation();
        });
    });
    
    // Shift amount listener
    document.getElementById('shift-amount').addEventListener('input', updateCurrentOperation);
    
    // Variable selector listeners
    document.getElementById('var-select-1').addEventListener('change', function() {
        selectedVar1 = parseInt(this.value);
        updateCurrentOperation();
    });
    
    document.getElementById('var-select-2').addEventListener('change', function() {
        selectedVar2 = parseInt(this.value);
        updateCurrentOperation();
    });
    
    // Trick buttons
    document.querySelectorAll('.trick-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const trick = e.target.dataset.trick;
            switch(trick) {
                case 'powerof2':
                    checkPowerOf2();
                    break;
                case 'countbits':
                    countSetBits();
                    break;
                case 'toggle':
                    toggleBit();
                    break;
                case 'set':
                    setBit();
                    break;
                case 'clear':
                    clearBit();
                    break;
                case 'check':
                    checkBit();
                    break;
                case 'swap':
                    swapNumbers();
                    break;
                case 'missing':
                    findMissing();
                    break;
            }
        });
    });
    
    // Problem solution toggles
    document.querySelectorAll('.solve-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => toggleSolution(index));
    });
    
    // Initialize with 0s
    updateAll();
    
    // Initialize binary displays with proper class
    updateAllBinaryDisplays();
    
    // Initialize remove button visibility
    updateRemoveButtonVisibility();
    
    // Add smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// Helper Functions
function getBitSize(num1, num2) {
    // Determine required bit size based on larger number
    const maxNum = Math.max(Math.abs(num1), Math.abs(num2));
    
    if (maxNum <= 255) return 8;  // Fits in 8 bits
    if (maxNum <= 65535) return 16; // Fits in 16 bits
    return 32; // Needs 32 bits
}

function toBinary(num, bitSize = 8) {
    // Convert to binary with specified bit size
    const binary = (num >>> 0).toString(2).padStart(32, '0');
    return binary.slice(-bitSize);
}

function toBinaryDisplay(binary) {
    const bitSize = binary.length;
    
    // Create individual input fields for each bit
    if (bitSize === 8) {
        // 8 bits: single row, larger size
        return Array.from(binary).map((bit, index) => {
            if (index === 4) {
                return `<span class="bit-spacer"> </span><input type="text" class="bit-input" maxlength="1" value="${bit}" data-index="${index}">`;
            }
            return `<input type="text" class="bit-input" maxlength="1" value="${bit}" data-index="${index}">`;
        }).join('');
    } else if (bitSize === 16) {
        // 16 bits: 2 rows of 8 bits each
        const row1 = Array.from(binary.slice(0, 8)).map((bit, index) => {
            if (index === 4) {
                return `<span class="bit-spacer"> </span><input type="text" class="bit-input" maxlength="1" value="${bit}" data-index="${index}">`;
            }
            return `<input type="text" class="bit-input" maxlength="1" value="${bit}" data-index="${index}">`;
        }).join('');
        
        const row2 = Array.from(binary.slice(8, 16)).map((bit, index) => {
            const globalIndex = index + 8;
            if (index === 4) {
                return `<span class="bit-spacer"> </span><input type="text" class="bit-input" maxlength="1" value="${bit}" data-index="${globalIndex}">`;
            }
            return `<input type="text" class="bit-input" maxlength="1" value="${bit}" data-index="${globalIndex}">`;
        }).join('');
        
        return `<div class="bit-row">${row1}</div><div class="bit-row">${row2}</div>`;
    } else {
        // 32 bits: 2 rows of 16 bits each
        const row1 = Array.from(binary.slice(0, 16)).map((bit, index) => {
            if (index > 0 && index % 4 === 0) {
                return `<span class="bit-spacer"> </span><input type="text" class="bit-input" maxlength="1" value="${bit}" data-index="${index}">`;
            }
            return `<input type="text" class="bit-input" maxlength="1" value="${bit}" data-index="${index}">`;
        }).join('');
        
        const row2 = Array.from(binary.slice(16, 32)).map((bit, index) => {
            const globalIndex = index + 16;
            if (index > 0 && index % 4 === 0) {
                return `<span class="bit-spacer"> </span><input type="text" class="bit-input" maxlength="1" value="${bit}" data-index="${globalIndex}">`;
            }
            return `<input type="text" class="bit-input" maxlength="1" value="${bit}" data-index="${globalIndex}">`;
        }).join('');
        
        return `<div class="bit-row">${row1}</div><div class="bit-row">${row2}</div>`;
    }
}

function toBinaryDisplayReadOnly(binary) {
    const bitSize = binary.length;
    
    // Create read-only span elements for operation display
    if (bitSize === 8) {
        // 8 bits: single row
        return Array.from(binary).map((bit, index) => {
            if (index === 4) {
                return ` <span class="bit">${bit}</span>`;
            }
            return `<span class="bit">${bit}</span>`;
        }).join('');
    } else if (bitSize === 16) {
        // 16 bits: single row with spacing every 4 bits
        return Array.from(binary).map((bit, index) => {
            if (index > 0 && index % 4 === 0) {
                return ` <span class="bit">${bit}</span>`;
            }
            return `<span class="bit">${bit}</span>`;
        }).join('');
    } else {
        // 32 bits: 2 rows of 16 bits each
        const row1 = Array.from(binary.slice(0, 16)).map((bit, index) => {
            if (index > 0 && index % 4 === 0) {
                return ` <span class="bit">${bit}</span>`;
            }
            return `<span class="bit">${bit}</span>`;
        }).join('');
        
        const row2 = Array.from(binary.slice(16, 32)).map((bit, index) => {
            if (index > 0 && index % 4 === 0) {
                return ` <span class="bit">${bit}</span>`;
            }
            return `<span class="bit">${bit}</span>`;
        }).join('');
        
        return `<div class="bit-row">${row1}</div><div class="bit-row">${row2}</div>`;
    }
}

function highlightDifferences(binary1, binary2) {
    const bitSize = binary2.length;
    
    // Highlight bits that are different
    if (bitSize === 8) {
        return Array.from(binary2).map((bit, index) => {
            const isDifferent = binary1[index] !== binary2[index];
            const cssClass = isDifferent ? 'bit highlight' : 'bit';
            if (index === 4) {
                return ` <span class="${cssClass}">${bit}</span>`;
            }
            return `<span class="${cssClass}">${bit}</span>`;
        }).join('');
    } else if (bitSize === 16) {
        // 16 bits: single row with spacing every 4 bits
        return Array.from(binary2).map((bit, index) => {
            const isDifferent = binary1[index] !== binary2[index];
            const cssClass = isDifferent ? 'bit highlight' : 'bit';
            if (index > 0 && index % 4 === 0) {
                return ` <span class="${cssClass}">${bit}</span>`;
            }
            return `<span class="${cssClass}">${bit}</span>`;
        }).join('');
    } else {
        const row1 = Array.from(binary2.slice(0, 16)).map((bit, index) => {
            const isDifferent = binary1[index] !== binary2[index];
            const cssClass = isDifferent ? 'bit highlight' : 'bit';
            if (index > 0 && index % 4 === 0) {
                return ` <span class="${cssClass}">${bit}</span>`;
            }
            return `<span class="${cssClass}">${bit}</span>`;
        }).join('');
        
        const row2 = Array.from(binary2.slice(16, 32)).map((bit, index) => {
            const globalIndex = index + 16;
            const isDifferent = binary1[globalIndex] !== binary2[globalIndex];
            const cssClass = isDifferent ? 'bit highlight' : 'bit';
            if (index > 0 && index % 4 === 0) {
                return ` <span class="${cssClass}">${bit}</span>`;
            }
            return `<span class="${cssClass}">${bit}</span>`;
        }).join('');
        
        return `<div class="bit-row">${row1}</div><div class="bit-row">${row2}</div>`;
    }
}

function highlightResultBits(binary) {
    const bitSize = binary.length;
    
    // Highlight 1 bits in result
    if (bitSize === 8) {
        return Array.from(binary).map((bit, index) => {
            const cssClass = bit === '1' ? 'bit result-1' : 'bit';
            if (index === 4) {
                return ` <span class="${cssClass}">${bit}</span>`;
            }
            return `<span class="${cssClass}">${bit}</span>`;
        }).join('');
    } else if (bitSize === 16) {
        // 16 bits: single row with spacing every 4 bits
        return Array.from(binary).map((bit, index) => {
            const cssClass = bit === '1' ? 'bit result-1' : 'bit';
            if (index > 0 && index % 4 === 0) {
                return ` <span class="${cssClass}">${bit}</span>`;
            }
            return `<span class="${cssClass}">${bit}</span>`;
        }).join('');
    } else {
        const row1 = Array.from(binary.slice(0, 16)).map((bit, index) => {
            const cssClass = bit === '1' ? 'bit result-1' : 'bit';
            if (index > 0 && index % 4 === 0) {
                return ` <span class="${cssClass}">${bit}</span>`;
            }
            return `<span class="${cssClass}">${bit}</span>`;
        }).join('');
        
        const row2 = Array.from(binary.slice(16, 32)).map((bit, index) => {
            const cssClass = bit === '1' ? 'bit result-1' : 'bit';
            if (index > 0 && index % 4 === 0) {
                return ` <span class="${cssClass}">${bit}</span>`;
            }
            return `<span class="${cssClass}">${bit}</span>`;
        }).join('');
        
        return `<div class="bit-row">${row1}</div><div class="bit-row">${row2}</div>`;
    }
}

function animateElement(element) {
    // Add pulse animation to element
    if (element) {
        element.classList.add('animate-pulse');
        setTimeout(() => {
            element.classList.remove('animate-pulse');
        }, 600);
    }
}

// Input Handlers
function handleNum1Change(e) {
    num1 = parseInt(e.target.value) || 0;
    animateElement(document.getElementById('binary1'));
    updateBinaryDisplay(num1, 1);
    updateCurrentOperation();
}

function handleNum2Change(e) {
    num2 = parseInt(e.target.value) || 0;
    animateElement(document.getElementById('binary2'));
    updateBinaryDisplay(num2, 2);
    updateCurrentOperation();
}

function setupBinaryInputListeners() {
    // Setup listeners for all bit inputs
    document.querySelectorAll('.binary-display').forEach(container => {
        setupBinaryInputListenersForElement(container);
    });
}

function setupBinaryInputListenersForElement(container) {
    // Setup listeners for bit inputs in a specific container
    container.querySelectorAll('.bit-input').forEach(input => {
        // Remove existing listeners to avoid duplicates
        input.removeEventListener('input', handleBitInput);
        input.removeEventListener('keydown', handleBitKeydown);
        input.removeEventListener('paste', handleBitPaste);
        
        // Add listeners
        input.addEventListener('input', handleBitInput);
        input.addEventListener('keydown', handleBitKeydown);
        input.addEventListener('paste', handleBitPaste);
    });
}

function handleBitKeydown(e) {
    const input = e.target;
    const currentIndex = parseInt(input.dataset.index);
    const container = input.closest('.binary-display');
    const allInputs = container.querySelectorAll('.bit-input');
    
    // Arrow key navigation
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        allInputs[currentIndex - 1].focus();
        allInputs[currentIndex - 1].select();
        e.preventDefault();
        return;
    }
    
    if (e.key === 'ArrowRight' && currentIndex < allInputs.length - 1) {
        allInputs[currentIndex + 1].focus();
        allInputs[currentIndex + 1].select();
        e.preventDefault();
        return;
    }
    
    // Handle 0 and 1 - set value and move to next
    if (e.key === '0' || e.key === '1') {
        e.preventDefault();
        input.value = e.key;
        
        // Move to next input
        if (currentIndex < allInputs.length - 1) {
            allInputs[currentIndex + 1].focus();
            allInputs[currentIndex + 1].select();
        }
        
        // Update the number
        updateNumberFromBits(container);
        return;
    }
    
    // Block all other keys except ctrl/meta combinations
    if (!e.ctrlKey && !e.metaKey) {
        e.preventDefault();
    }
}

function handleBitPaste(e) {
    e.preventDefault();
    const input = e.target;
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    const cleanedText = pastedText.replace(/[^01]/g, '');
    
    if (cleanedText.length === 0) return;
    
    const container = input.closest('.binary-display');
    const allInputs = container.querySelectorAll('.bit-input');
    const currentIndex = parseInt(input.dataset.index);
    
    // Paste bits starting from current position
    for (let i = 0; i < cleanedText.length && currentIndex + i < allInputs.length; i++) {
        allInputs[currentIndex + i].value = cleanedText[i];
    }
    
    // Update the number
    updateNumberFromBits(container);
}

function handleBitInput(e) {
    // Input validation handled in keydown
    const input = e.target;
    const container = input.closest('.binary-display');
    updateNumberFromBits(container);
}

function updateNumberFromBits(container) {
    const allInputs = container.querySelectorAll('.bit-input');
    let binary = '';
    allInputs.forEach(input => {
        binary += input.value || '0';
    });
    
    const decimal = parseInt(binary, 2) || 0;
    const numberIndex = container.dataset.number;
    
    if (numberIndex === '1') {
        num1 = decimal;
        document.getElementById('number1').value = decimal;
    } else {
        num2 = decimal;
        document.getElementById('number2').value = decimal;
    }
    
    // Update operation display
    updateCurrentOperation();
}

// Update All Operations
function updateAll() {
    // Get required bit size
    const bitSize = getBitSize(num1, num2);
    
    // Update binary displays
    const binary1 = toBinary(num1, bitSize);
    const binary2 = toBinary(num2, bitSize);
    
    document.getElementById('binary1').innerHTML = toBinaryDisplay(binary1);
    document.getElementById('binary2').innerHTML = toBinaryDisplay(binary2);
    
    // Setup listeners for new inputs
    setupBinaryInputListeners();
    
    // Update current operation
    updateCurrentOperation();
}

function updateCurrentOperation() {
    const val1 = window[`num${selectedVar1}`] || 0;
    const val2 = window[`num${selectedVar2}`] || 0;
    const bitSize = getBitSize(val1, val2);
    
    // Get variable names for display
    const varName1 = String.fromCharCode(64 + selectedVar1);
    const varName2 = String.fromCharCode(64 + selectedVar2);
    
    // Show/hide second variable selector based on operation
    const var2Container = document.getElementById('var-select-2-container');
    const needsSecondVar = currentMode !== 'not' && currentMode !== 'left-shift' && currentMode !== 'right-shift';
    if (var2Container) {
        var2Container.style.display = needsSecondVar ? 'flex' : 'none';
    }
    
    switch(currentMode) {
        case 'and':
            currentResult = val1 & val2;
            updateOperation('AND', '&', currentResult, 'Returns 1 only if BOTH bits are 1', bitSize, val1, val2, varName1, varName2, true, true);
            break;
        case 'or':
            currentResult = val1 | val2;
            updateOperation('OR', '|', currentResult, 'Returns 1 if ANY bit is 1', bitSize, val1, val2, varName1, varName2, true, true);
            break;
        case 'xor':
            currentResult = val1 ^ val2;
            updateOperation('XOR', '^', currentResult, 'Returns 1 if bits are DIFFERENT', bitSize, val1, val2, varName1, varName2, true, true);
            break;
        case 'not':
            currentResult = ~val1;
            updateOperation('NOT', '~', currentResult, 'Flips all bits (0→1, 1→0)', bitSize, val1, val2, varName1, varName2, true, false);
            break;
        case 'left-shift':
            const leftAmount = parseInt(document.getElementById('shift-amount').value) || 0;
            currentResult = val1 << leftAmount;
            updateOperation('LEFT SHIFT', '<<', currentResult, `Multiplies by 2^${leftAmount} (shifts left, fills with 0)`, bitSize, val1, val2, varName1, varName2, true, false, true);
            break;
        case 'right-shift':
            const rightAmount = parseInt(document.getElementById('shift-amount').value) || 0;
            currentResult = val1 >> rightAmount;
            updateOperation('RIGHT SHIFT', '>>', currentResult, `Divides by 2^${rightAmount} (shifts right)`, bitSize, val1, val2, varName1, varName2, true, false, true);
            break;
    }
}

function updateOperation(name, symbol, result, explanation, bitSize, val1, val2, varName1, varName2, showA, showB, showShift = false) {
    const binary1 = toBinary(val1, bitSize);
    const binary2 = toBinary(val2, bitSize);
    const binaryResult = toBinary(result, bitSize);
    
    // Update title
    document.getElementById('current-operation-title').textContent = `${name} Operation (${symbol})`;
    
    // Show/hide operands
    document.getElementById('operand-a-container').style.display = showA ? 'flex' : 'none';
    document.getElementById('operand-b-container').style.display = showB ? 'flex' : 'none';
    document.getElementById('shift-control-container').style.display = showShift ? 'block' : 'none';
    
    // Update content with variable names
    if (showA) {
        const labelA = document.querySelector('#operand-a-container .label');
        if (labelA) labelA.textContent = `${varName1}:`;
        document.getElementById('operation-a').innerHTML = toBinaryDisplayReadOnly(binary1);
    }
    if (showB) {
        const labelB = document.querySelector('#operand-b-container .label');
        if (labelB) labelB.textContent = `${varName2}:`;
        document.getElementById('operation-b').innerHTML = toBinaryDisplayReadOnly(binary2);
    }
    
    document.getElementById('operation-result').innerHTML = highlightResultBits(binaryResult);
    document.getElementById('operation-decimal').textContent = result;
    document.getElementById('operation-explanation').textContent = explanation;
}

// Bit Tricks
function checkPowerOf2() {
    const value = num1;
    const isPower = value > 0 && (value & (value - 1)) === 0;
    const bitSize = getBitSize(value, 0);
    
    const binary = toBinary(value, bitSize);
    const binaryMinus1 = toBinary(value - 1, bitSize);
    
    const resultElement = document.getElementById('powerof2-result');
    animateElement(resultElement);
    
    resultElement.innerHTML = `
        <strong style="color: ${isPower ? '#10a37f' : '#ef4444'}">${isPower ? '✓ Is a power of 2' : '✗ Not a power of 2'}</strong><br>
        ${value}: <span style="font-family: 'Courier New', monospace;">${binary}</span><br>
        ${value - 1}: <span style="font-family: 'Courier New', monospace;">${binaryMinus1}</span><br>
        ${value} & ${value - 1} = ${value & (value - 1)}
    `;
}

function countSetBits() {
    const value = num1;
    let count = 0;
    let temp = value;
    
    while (temp) {
        count++;
        temp &= temp - 1;
    }
    
    const bitSize = getBitSize(value, 0);
    const binary = toBinary(value, bitSize);
    const ones = binary.split('1').length - 1;
    
    const resultElement = document.getElementById('countbits-result');
    animateElement(resultElement);
    
    resultElement.innerHTML = `
        <strong>Count: ${count}</strong><br>
        Binary: <span style="font-family: 'Courier New', monospace;">${binary}</span><br>
        Number of 1s: ${ones}
    `;
}

function toggleBit() {
    const value = num1;
    const position = parseInt(document.getElementById('toggle-pos').value) || 0;
    const bitSize = getBitSize(value, 0);
    
    const resultElement = document.getElementById('toggle-result');
    
    if (position < 0 || position > 31) {
        resultElement.innerHTML = '<span style="color: #ef4444;">Position must be 0-31</span>';
        return;
    }
    
    const result = value ^ (1 << position);
    const binaryBefore = toBinary(value, bitSize);
    const binaryAfter = toBinary(result, bitSize);
    
    animateElement(resultElement);
    
    resultElement.innerHTML = `
        Before: <span style="font-family: 'Courier New', monospace;">${binaryBefore}</span><br>
        After:  <span style="font-family: 'Courier New', monospace;">${binaryAfter}</span><br>
        Result: <strong>${result}</strong>
    `;
}

function setBit() {
    const value = num1;
    const position = parseInt(document.getElementById('set-pos').value) || 0;
    const bitSize = getBitSize(value, 0);
    
    const resultElement = document.getElementById('set-result');
    
    if (position < 0 || position > 31) {
        resultElement.innerHTML = '<span style="color: #ef4444;">Position must be 0-31</span>';
        return;
    }
    
    const result = value | (1 << position);
    const binaryBefore = toBinary(value, bitSize);
    const binaryAfter = toBinary(result, bitSize);
    
    animateElement(resultElement);
    
    resultElement.innerHTML = `
        Before: <span style="font-family: 'Courier New', monospace;">${binaryBefore}</span><br>
        After:  <span style="font-family: 'Courier New', monospace;">${binaryAfter}</span><br>
        Result: <strong>${result}</strong>
    `;
}

function clearBit() {
    const value = num1;
    const position = parseInt(document.getElementById('clear-pos').value) || 0;
    const bitSize = getBitSize(value, 0);
    
    const resultElement = document.getElementById('clear-result');
    
    if (position < 0 || position > 31) {
        resultElement.innerHTML = '<span style="color: #ef4444;">Position must be 0-31</span>';
        return;
    }
    
    const result = value & ~(1 << position);
    const binaryBefore = toBinary(value, bitSize);
    const binaryAfter = toBinary(result, bitSize);
    
    animateElement(resultElement);
    
    resultElement.innerHTML = `
        Before: <span style="font-family: 'Courier New', monospace;">${binaryBefore}</span><br>
        After:  <span style="font-family: 'Courier New', monospace;">${binaryAfter}</span><br>
        Result: <strong>${result}</strong>
    `;
}

function checkBit() {
    const value = num1;
    const position = parseInt(document.getElementById('check-pos').value) || 0;
    const bitSize = getBitSize(value, 0);
    
    const resultElement = document.getElementById('check-result');
    
    if (position < 0 || position > 31) {
        resultElement.innerHTML = '<span style="color: #ef4444;">Position must be 0-31</span>';
        return;
    }
    
    const isSet = (value & (1 << position)) !== 0;
    const binary = toBinary(value, bitSize);
    
    animateElement(resultElement);
    
    resultElement.innerHTML = `
        Binary: <span style="font-family: 'Courier New', monospace;">${binary}</span><br>
        Bit at position ${position}: <strong style="color: ${isSet ? '#10a37f' : '#ef4444'}">${isSet ? '1 (Set)' : '0 (Not Set)'}</strong>
    `;
}

function swapNumbers() {
    const a = num1;
    const b = num2;
    
    let tempA = a;
    let tempB = b;
    
    tempA = tempA ^ tempB;
    tempB = tempA ^ tempB;
    tempA = tempA ^ tempB;
    
    const resultElement = document.getElementById('swap-result');
    animateElement(resultElement);
    
    resultElement.innerHTML = `
        <strong>Before:</strong> a = ${a}, b = ${b}<br>
        Step 1: a = a ^ b = ${a} ^ ${b} = ${a ^ b}<br>
        Step 2: b = a ^ b = ${a ^ b} ^ ${b} = ${(a ^ b) ^ b}<br>
        Step 3: a = a ^ b = ${a ^ b} ^ ${(a ^ b) ^ b} = ${(a ^ b) ^ ((a ^ b) ^ b)}<br>
        <strong style="color: #10a37f;">After:</strong> a = ${tempA}, b = ${tempB}
    `;
}

function findMissing() {
    // Use a sample array [1,2,3,5] (missing 4)
    const numbers = [1, 2, 3, 5];
    
    const resultElement = document.getElementById('missing-result');
    
    const n = numbers.length + 1;
    let xorAll = 0;
    let xorArray = 0;
    
    for (let i = 1; i <= n; i++) {
        xorAll ^= i;
    }
    
    for (let num of numbers) {
        xorArray ^= num;
    }
    
    const missing = xorAll ^ xorArray;
    
    animateElement(resultElement);
    
    resultElement.innerHTML = `
        Array: [${numbers.join(', ')}]<br>
        Expected range: 1 to ${n}<br>
        XOR of 1..${n}: ${xorAll}<br>
        XOR of array: ${xorArray}<br>
        <strong style="color: #10a37f;">Missing number: ${missing}</strong>
    `;
}

// Problem Solutions
function toggleSolution(index) {
    const solutions = document.querySelectorAll('.solution');
    const btn = document.querySelectorAll('.solve-btn')[index];
    
    if (solutions[index].style.display === 'none' || !solutions[index].style.display) {
        solutions[index].style.display = 'block';
        btn.textContent = 'Hide Solution';
        animateElement(solutions[index]);
    } else {
        solutions[index].style.display = 'none';
        btn.textContent = 'Show Solution';
    }
}
