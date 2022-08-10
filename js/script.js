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

document.querySelector('#color').style.display = 'none';
document.querySelector('#design').addEventListener('change', e => changeColorOptions(e.target.value));

document.querySelector('#activities').addEventListener('change', e => {
	updatePriceText(e);
	courseTimeCheck(e);
});

document.querySelector('#paypal').style.display = 'none';
document.querySelector('#bitcoin').style.display = 'none';
document.querySelector('#payment').value = 'credit-card';

document.querySelector('form').addEventListener('submit', e => {
	
});

document.querySelector('#payment').addEventListener('change', e => {
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
});

function updatePriceText(e){
	const totalElement = document.querySelector('#activities-cost');
	const activityCost = e.target.getAttribute('data-cost');
	if(e.target.checked){
		totalActivityCost += +activityCost;
	} else {
		totalActivityCost -= +activityCost;
	}
	totalElement.textContent = `Total: $${totalActivityCost}`;
}

function courseTimeCheck(e){
	const inputs = document.querySelectorAll('#activities-box label input[type="checkbox"]');
	inputs.forEach(input => {
		if(input !== e.target && input.getAttribute('data-day-and-time') === e.target.getAttribute('data-day-and-time') && e.target.getAttribute('data-day-and-time')){
			if(e.target.checked){
				input.setAttribute('disabled', true);
			} else {
				input.removeAttribute('disabled');
			}
		} 
	});
}

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
	document.querySelector('#color').style.display = null;
}