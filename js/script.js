let totalActivityCost = 0;//tracks the cost fo all the selected activivties

document.querySelector('#name').focus();
document.querySelector('#other-job-role').style.display = 'none';

document.querySelector('#title').addEventListener('change', (e) => {
	if(e.target.value === 'other'){
		document.querySelector('#other-job-role').style.display = null;
    } else {
		document.querySelector('#other-job-role').style.display = 'none';
	}
});

document.querySelector('#shirt-colors').style.display = 'none';
document.querySelector('#design').addEventListener('change', e => changeColorOptions(e.target.value));

document.querySelector('#activities').addEventListener('change', e => {
	updatePriceText(e.target.getAttribute('data-cost'), e.target.checked);
	courseTimeCheck(e);
});

document.querySelector('#paypal').style.display = 'none';
document.querySelector('#bitcoin').style.display = 'none';
document.querySelector('#payment').value = 'credit-card';

document.querySelector('form').addEventListener('input', e => {
	if(e.target.getAttribute('id') === 'name'){
		nameCheck();
	} 
	else if(e.target.getAttribute('id') === 'email'){
		emailCheck();
	} else if(e.target.getAttribute('id') === 'cc-num'){
		checkCardNumber();
	} else if(e.target.getAttribute('id') === 'zip'){
		checkCardZip();
	} else if(e.target.getAttribute('id') === 'cvv'){
		checkCardCVV();
	}
});

document.querySelector('form').addEventListener('submit', e => { 
	if(!checkFormSubmit()){
		e.preventDefault();
	}
});

document.querySelector('#payment').addEventListener('change', e => {changePaymentType(e)});

document.querySelectorAll('input[type="checkbox"]').forEach(input => {
	input.addEventListener('focus', e => e.target.parentNode.classList.add('focus'));
	input.addEventListener('blur', e => e.target.parentNode.classList.remove('focus'));
});

/**
 * Checks the validity of the name input
 * @method
 * @Param {Event} e - The event object
 */
function changePaymentType(e){
	const creditCard = document.querySelector('#credit-card');
	const paypal = document.querySelector('#paypal');
	const bitcoin = document.querySelector('#bitcoin');
	
	switch(e.target.value){
		case 'credit-card':
			creditCard.style.display = null;
			paypal.style.display = 'none';
			bitcoin.style.display = 'none';
			break;
			
		case 'paypal':
			creditCard.style.display = 'none';
			paypal.style.display = null;
			bitcoin.style.display = 'none';
			break;
			
		case 'bitcoin':
			creditCard.style.display = 'none';
			paypal.style.display = 'none';
			bitcoin.style.display = null;
			break;
	}
}

/**
 * When you click the register button this moethod checks all the required fields before submitting
 * @method
 */
function checkFormSubmit(){
	if(totalActivityCost <= 0){
		formError(document.querySelector('#activities').firstElementChild, false);
	} else{
		formError(document.querySelector('#activities').firstElementChild, true);
	}
	const name = nameCheck();
	const email = emailCheck();
	if(document.querySelector('#payment').value === 'credit-card'){
		const ccNum = checkCardNumber();
		const ccZip = checkCardZip();
		const ccCVV = checkCardCVV();
		
		if(name && email && ccNum && ccZip && ccCVV && totalActivityCost > 0){
			return true;
		} else {
			return false;
		}
	} else {
		if(name && email && totalActivityCost > 0){
			return true;
		} else {
			return false;
		}
	}
}

/**
 * Checks the validity of the name input
 * @method
 */
function nameCheck(){
	const name = document.querySelector('#name');
	formError(name, /^[a-z]+$/i.test(name.value.trim()));
	return /^[a-z]+$/i.test(name.value.trim());
}

/**
 * Checks the validity of the email input
 * @method
 */
function emailCheck(){
	const regex = /^[^@]+@[^@.]+\.[a-z]+$/i;
	const email = document.querySelector('#email');
	formError(email, regex.test(email.value));
	return regex.test(email.value);
}

/**
 * Checks the validity of the credit card number input
 * @method
 */
function checkCardNumber(){
	const cardNumber = document.querySelector('#cc-num');
	formError(cardNumber, /^[0-9]{13,16}$/.test(cardNumber.value.trim()));
	return /^[0-9]{13,16}$/.test(cardNumber.value.trim());
}

/**
 * Checks the validity of the credit card zip input
 * @method
 */
function checkCardZip(){
	const zipCode = document.querySelector('#zip');
	formError(zipCode, /^[0-9]{5}$/.test(zipCode.value.trim()));
	return /^[0-9]{5}$/.test(zipCode.value.trim());
}

/**
 * Checks the validity of the credit card cvv input
 * @method
 */
function checkCardCVV(){
	const cvv = document.querySelector('#cvv');
	formError(cvv, /^[0-9]{3}$/.test(cvv.value.trim()));
	return /^[0-9]{3}$/.test(cvv.value.trim());
}

/**
 * Handles applying and removing the errors
 * @method
 * @param {object} element - the element to be used
 * @param {boolean} error - determines if we are applying or removing the error
 */
function formError(element, error){
	if(!error){
		if(element.tagName === 'INPUT' && element.value.trim() !== ''){
			element.parentNode.lastElementChild.textContent = ``;
			element.parentNode.lastElementChild.textContent = `Please enter a valid ${element.parentNode.textContent.trim().slice(0, -3)} *`;
		} else if(element.tagName === 'INPUT' && element.value.trim() === ''){
			element.parentNode.lastElementChild.textContent = ``;
			element.parentNode.lastElementChild.textContent = `${element.parentNode.textContent.trim().slice(0, -3)} is required *`;
		}
		
		element.classList.add('error');
		element.parentNode.lastElementChild.style.display = 'block';
		element.parentNode.lastElementChild.classList.add('not-valid');
		if(!element.parentNode.classList.contains('activities'))
			element.parentNode.classList.remove('valid');
	} else {
		element.classList.remove('error');
		element.parentNode.lastElementChild.style.display = null;
		console.log(element.parentNode);
		if(!element.parentNode.classList.contains('activities'))
			element.parentNode.classList.add('valid');;
		element.parentNode.lastElementChild.classList.remove('not-valid');
	}
}

/**
 * Retrieves a user by email.
 * @method
 * @param {String} activityCost - the cost of the selected or unselected course
 * @param {boolean} checked - Wether or not the input you clicked is checked or not
 */
function updatePriceText(activityCost, checked){
	const totalElement = document.querySelector('#activities-cost');
	if(checked){
		totalActivityCost += +activityCost;
	} else {
		totalActivityCost -= +activityCost;
	}
	totalElement.textContent = `Total: $${totalActivityCost}`;
}

/**
 * When you select a course this checks the other courses for conflicting course times
 * @method
 * @param {Event} e - the event object
 */
function courseTimeCheck(e){
	const inputs = document.querySelectorAll('#activities-box label input[type="checkbox"]');
	inputs.forEach(input => {
		if(input !== e.target && input.getAttribute('data-day-and-time') === e.target.getAttribute('data-day-and-time') && e.target.getAttribute('data-day-and-time')){
			if(e.target.checked){
				input.parentNode.classList.add('disabled');
				input.disabled = true;
			} else {
				input.parentNode.classList.remove('disabled');
				input.disabled = false;
			}
		} 
	});
}

/**
 * When you select a tshirt design this changes the color selections availible 
 * @method
 * @param {string} design - The design selected by the user
 */
function changeColorOptions(design) {
	let options = document.querySelectorAll(`[data-theme`);
	let optionSelected = false;
	options.forEach(option => {
		if(option.getAttribute('data-theme') === design){
			if(!optionSelected){
				option.selected = true;
				optionSelected = true;
			}
			option.style.display = null;
		} else {
			option.style.display = 'none';
		}
	});
	document.querySelector('#shirt-colors').style.display = null;
}