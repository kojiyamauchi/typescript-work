import Diagnose from '@/Modules/Privates/Diagnose'
import ejs from 'ejs'

const mockData = {
  gender: 2,
  height: 170,
  age: 40,
  currentWeight: 80,
  targetWeight: 70,
  basicMetabolism: 1506,
  coefficient: 1.5,
  intakeCalorieForKeep: 2259,
  consumptionCalorieForKeep: 277,
  loseWeightMonth: 1.2,
  calorieForLoseWeightMonth: 280,
  intakeCalorieForLose: 2063,
  consumptionCalorieForLose: 361,
  goalDay: 8.3
}

const mockDOM = async () => {
  const templateCheck = await ejs.renderFile('./resource/templates/components/pages/primary/_check.ejs')
  const templateResult = await ejs.renderFile('./resource/templates/components/pages/primary/_result.ejs')
  document.body.innerHTML = templateCheck
  document.body.innerHTML += templateResult
}

beforeEach(() => mockDOM())

describe('Test Diagnose', () => {
  it('Math BMI', () => {
    const diagnose = new Diagnose()
    const currentWeightResult = diagnose['mathBMI'](mockData.currentWeight, mockData.height)
    const targetWeightResult = diagnose['mathBMI'](mockData.targetWeight, mockData.height)
    expect(currentWeightResult).toBeGreaterThan(diagnose.targetWeightMinBMI)
    expect(targetWeightResult).toBeGreaterThan(diagnose.targetWeightMinBMI)
  })

  it('Math BasicMetabolism', () => {
    const diagnose = new Diagnose()
    const result = diagnose['mathBasicMetabolism'](mockData.currentWeight, mockData.height, mockData.age, mockData.gender)
    expect(result).toBe(mockData.basicMetabolism)
  })

  it('Math IntakeCalorieForKeep', () => {
    const diagnose = new Diagnose()
    const result = diagnose['mathIntakeCalorieForKeep'](mockData.basicMetabolism)
    expect(result).toBe(mockData.intakeCalorieForKeep)
  })

  it('Math ConsumptionCalorieForKeep', () => {
    const diagnose = new Diagnose()
    const result = diagnose['mathConsumptionCalorieForKeep'](mockData.currentWeight)
    expect(result).toBe(mockData.consumptionCalorieForKeep)
  })

  it('Math LoseWeightMonth', () => {
    const diagnose = new Diagnose()
    const result = diagnose['mathLoseWeightMonth'](mockData.currentWeight)
    expect(result).toBe(mockData.loseWeightMonth)
  })

  it('Math CalorieForLoseWeightMonth', () => {
    const diagnose = new Diagnose()
    const result = diagnose['mathCalorieForLoseWeightMonth'](mockData.loseWeightMonth)
    expect(result).toBe(mockData.calorieForLoseWeightMonth)
  })

  it('Math IntakeCalorieForLose', () => {
    const diagnose = new Diagnose()
    const result = diagnose['mathIntakeCalorieForLose'](mockData.intakeCalorieForKeep, mockData.calorieForLoseWeightMonth)
    expect(result).toBe(mockData.intakeCalorieForLose)
  })

  it('Math ConsumptionCalorieForLose', () => {
    const diagnose = new Diagnose()
    const result = diagnose['mathConsumptionCalorieForLose'](mockData.consumptionCalorieForKeep, mockData.calorieForLoseWeightMonth)
    expect(result).toBe(mockData.consumptionCalorieForLose)
  })

  it('Math GoalDay', () => {
    const diagnose = new Diagnose()
    const result = diagnose['mathGoalDay'](mockData.currentWeight, mockData.targetWeight, mockData.loseWeightMonth)
    expect(result).toBe(mockData.goalDay)
  })

  it('Display Initialize', () => {
    const diagnose = new Diagnose()

    const start = diagnose['selectors']['startResult']!.textContent
    const target = diagnose['selectors']['targetResult']!.textContent
    const year = diagnose['selectors']['yearResult']!.textContent
    const month = diagnose['selectors']['monthResult']!.textContent
    const day = diagnose['selectors']['dayResult']!.textContent
    const intake = diagnose['selectors']['intakeResult']!.textContent
    const consumption = diagnose['selectors']['consumptionResult']!.textContent

    diagnose['selectors']['startResult']!.textContent = '99999999999999999999999999999999'
    diagnose['selectors']['targetResult']!.textContent = '99999999999999999999999999999999'
    diagnose['selectors']['yearResult']!.textContent = '99999999999999999999999999999999'
    diagnose['selectors']['monthResult']!.textContent = '99999999999999999999999999999999'
    diagnose['selectors']['dayResult']!.textContent = '99999999999999999999999999999999'
    diagnose['selectors']['intakeResult']!.textContent = '99999999999999999999999999999999'
    diagnose['selectors']['consumptionResult']!.textContent = '99999999999999999999999999999999'

    diagnose['displayInitialize']()

    expect(diagnose['selectors']['startResult']!.textContent).toBe(start)
    expect(diagnose['selectors']['targetResult']!.textContent).toBe(target)
    expect(diagnose['selectors']['yearResult']!.textContent).toBe(year)
    expect(diagnose['selectors']['monthResult']!.textContent).toBe(month)
    expect(diagnose['selectors']['dayResult']!.textContent).toBe(day)
    expect(diagnose['selectors']['intakeResult']!.textContent).toBe(intake)
    expect(diagnose['selectors']['consumptionResult']!.textContent).toBe(consumption)
  })

  it('Display Result', () => {
    const diagnose = new Diagnose()

    const pickMonth = Math.floor(mockData.goalDay)
    const pickDay = Math.round(30 * (mockData.goalDay - pickMonth))
    const today = new Date()
    today.setMonth(today.getMonth() + pickMonth)
    today.setDate(today.getDate() + pickDay)

    diagnose['displayResult'](
      mockData.goalDay,
      mockData.currentWeight,
      mockData.targetWeight,
      mockData.intakeCalorieForLose,
      mockData.consumptionCalorieForLose
    )

    expect(diagnose['selectors']['startResult']!.textContent).toBe(mockData.currentWeight.toLocaleString().replace(/,/g, ''))
    expect(diagnose['selectors']['targetResult']!.textContent).toBe(mockData.targetWeight.toLocaleString().replace(/,/g, ''))
    expect(diagnose['selectors']['yearResult']!.textContent).toBe(today.getFullYear().toLocaleString().replace(/,/g, ''))
    expect(diagnose['selectors']['monthResult']!.textContent).toBe((today.getMonth() + 1).toLocaleString().replace(/,/g, ''))
    expect(diagnose['selectors']['dayResult']!.textContent).toBe(today.getDate().toLocaleString().replace(/,/g, ''))
    expect(diagnose['selectors']['intakeResult']!.textContent).toBe(mockData.intakeCalorieForLose.toLocaleString().replace(/,/g, ''))
    expect(diagnose['selectors']['consumptionResult']!.textContent).toBe(mockData.consumptionCalorieForLose.toLocaleString().replace(/,/g, ''))
  })

  it('Init', () => {
    const diagnose = new Diagnose()

    const maleValue = Number(diagnose['selectors']['genderButton']![0].value)
    const heightValue = Number(diagnose['selectors']['heightBox']!.value)
    const ageValue = Number(diagnose['selectors']['ageBox']!.value)
    const currentWeightValue = Number(diagnose['selectors']['currentWeightBox']!.value)
    const targetWeightValue = Number(diagnose['selectors']['targetWeightBox']!.value)

    diagnose.init()

    expect(diagnose.genderValue).toBe(maleValue)
    expect(diagnose.heightValue).toBe(heightValue)
    expect(diagnose.heightValidation).toBeTruthy()
    expect(diagnose.ageValue).toBe(ageValue)
    expect(diagnose.ageValidation).toBeTruthy()
    expect(diagnose.currentWeightValue).toBe(currentWeightValue)
    expect(diagnose.currentWeightValidation).toBeTruthy()
    expect(diagnose.targetWeightValue).toBe(targetWeightValue)
    expect(diagnose.targetWeightValidation).toBeTruthy()
  })

  it('Set Gender', () => {
    const diagnose = new Diagnose()
    diagnose.setGender()

    Array.from(diagnose['selectors']['genderButton']!, (selector, index): void => {
      selector.dispatchEvent(new Event('click'))

      Array.from(diagnose['selectors']['genderButton']!, (_selector, _index): void => {
        if (index !== _index) expect(diagnose['selectors']['genderButton']![_index].classList.contains('is-active')).toBeFalsy()
      })

      expect(selector.classList.contains('is-active')).toBeTruthy()
      expect(diagnose.genderValue).toBe(Number(selector.value))
    })
  })

  it('Set Height', () => {
    const diagnose = new Diagnose()

    const defaultHeightValue = Number(diagnose['selectors']['heightBox']!.value)
    const falsyHeightMin = diagnose.heightMin - 1
    const falsyHeightMax = diagnose.heightMax + 1
    const defaultTargetWeightValue = Number(diagnose['selectors']['targetWeightBox']!.value)
    const falsyTargetWeightMax = diagnose.targetWeightMaxWeight! + 1
    const falsyForBMI = 1

    diagnose.setHeight()

    diagnose['selectors']['heightBox']!.dispatchEvent(new Event('input'))
    expect(diagnose.heightValue).toBe(defaultHeightValue)
    expect(diagnose.heightValidation).toBeTruthy()

    diagnose['selectors']['heightBox']!.value = falsyHeightMin.toLocaleString()
    diagnose['selectors']['heightBox']!.dispatchEvent(new Event('input'))
    expect(diagnose.heightValue).toBe(falsyHeightMin)
    expect(diagnose.heightValidation).toBeFalsy()

    diagnose['selectors']['heightBox']!.value = falsyHeightMax.toLocaleString()
    diagnose['selectors']['heightBox']!.dispatchEvent(new Event('input'))
    expect(diagnose.heightValue).toBe(falsyHeightMax)
    expect(diagnose.heightValidation).toBeFalsy()

    diagnose['selectors']['heightBox']!.value = defaultHeightValue.toLocaleString()
    diagnose['selectors']['heightBox']!.dispatchEvent(new Event('input'))
    expect(diagnose.targetWeightValue).toBe(defaultTargetWeightValue)
    expect(diagnose.targetWeightValidation).toBeTruthy()

    diagnose['selectors']['targetWeightBox']!.value = falsyTargetWeightMax.toLocaleString()
    diagnose['selectors']['heightBox']!.dispatchEvent(new Event('input'))
    expect(diagnose.targetWeightValue).toBe(falsyTargetWeightMax)
    expect(diagnose.targetWeightValidation).toBeFalsy()

    diagnose['selectors']['targetWeightBox']!.value = falsyForBMI.toLocaleString()
    diagnose['selectors']['heightBox']!.dispatchEvent(new Event('input'))
    expect(diagnose.targetWeightValue).toBe(falsyForBMI)
    expect(diagnose.targetWeightValidation).toBeFalsy()
  })

  it('Set Age', () => {
    const diagnose = new Diagnose()

    const defaultAgeValue = Number(diagnose['selectors']['ageBox']!.value)
    const falsyAgeMin = diagnose.ageMin - 1
    const falsyAgeMax = diagnose.ageMax + 1

    diagnose.setAge()

    diagnose['selectors']['ageBox']!.dispatchEvent(new Event('input'))
    expect(diagnose.ageValue).toBe(defaultAgeValue)
    expect(diagnose.ageValidation).toBeTruthy()

    diagnose['selectors']['ageBox']!.value = falsyAgeMin.toLocaleString()
    diagnose['selectors']['ageBox']!.dispatchEvent(new Event('input'))
    expect(diagnose.ageValue).toBe(falsyAgeMin)
    expect(diagnose.ageValidation).toBeFalsy()

    diagnose['selectors']['ageBox']!.value = falsyAgeMax.toLocaleString()
    diagnose['selectors']['ageBox']!.dispatchEvent(new Event('input'))
    expect(diagnose.ageValue).toBe(falsyAgeMax)
    expect(diagnose.ageValidation).toBeFalsy()
  })

  it('Set Current Weight', () => {
    const diagnose = new Diagnose()

    const defaultCurrentWeightValue = Number(diagnose['selectors']['currentWeightBox']!.value)
    const falsyCurrentWeightMin = diagnose.currentWeightMin - 1
    const falsyCurrentWeightMax = diagnose.currentWeightMax + 1
    const defaultTargetWeightValue = Number(diagnose['selectors']['targetWeightBox']!.value)
    const falsyTargetWeightMax = defaultCurrentWeightValue + 1
    const falsyForBMI = 1

    diagnose.setCurrentWeight()

    diagnose['selectors']['currentWeightBox']!.dispatchEvent(new Event('input'))
    expect(diagnose.currentWeightValue).toBe(defaultCurrentWeightValue)
    expect(diagnose.currentWeightValidation).toBeTruthy()

    diagnose['selectors']['currentWeightBox']!.value = falsyCurrentWeightMin.toLocaleString()
    diagnose['selectors']['currentWeightBox']!.dispatchEvent(new Event('input'))
    expect(diagnose.currentWeightValue).toBe(falsyCurrentWeightMin)
    expect(diagnose.currentWeightValidation).toBeFalsy()

    diagnose['selectors']['currentWeightBox']!.value = falsyCurrentWeightMax.toLocaleString()
    diagnose['selectors']['currentWeightBox']!.dispatchEvent(new Event('input'))
    expect(diagnose.currentWeightValue).toBe(falsyCurrentWeightMax)
    expect(diagnose.currentWeightValidation).toBeFalsy()

    diagnose['selectors']['currentWeightBox']!.value = defaultCurrentWeightValue.toLocaleString()
    diagnose['selectors']['currentWeightBox']!.dispatchEvent(new Event('input'))
    expect(diagnose.targetWeightValue).toBe(defaultTargetWeightValue)
    expect(diagnose.targetWeightValidation).toBeTruthy()

    diagnose['selectors']['targetWeightBox']!.value = falsyTargetWeightMax.toLocaleString()
    diagnose['selectors']['currentWeightBox']!.dispatchEvent(new Event('input'))
    expect(diagnose.targetWeightValue).toBe(falsyTargetWeightMax)
    expect(diagnose.targetWeightValidation).toBeFalsy()

    diagnose['selectors']['targetWeightBox']!.value = falsyForBMI.toLocaleString()
    diagnose['selectors']['currentWeightBox']!.dispatchEvent(new Event('input'))
    expect(diagnose.targetWeightValue).toBe(falsyForBMI)
    expect(diagnose.targetWeightValidation).toBeFalsy()
  })

  it('Set Target Weight', () => {
    const diagnose = new Diagnose()

    const defaultTargetWeightValue = Number(diagnose['selectors']['targetWeightBox']!.value)
    const falsyTargetWeightMax = diagnose.currentWeightValue! + 1
    const falsyForBMI = 1

    diagnose.setTargetWeight()

    diagnose['selectors']['targetWeightBox']!.dispatchEvent(new Event('input'))
    expect(diagnose.targetWeightValue).toBe(defaultTargetWeightValue)
    expect(diagnose.targetWeightValidation).toBeTruthy()

    diagnose['selectors']['targetWeightBox']!.value = falsyTargetWeightMax.toLocaleString()
    diagnose['selectors']['targetWeightBox']!.dispatchEvent(new Event('input'))
    expect(diagnose.targetWeightValue).toBe(falsyTargetWeightMax)
    expect(diagnose.targetWeightValidation).toBeFalsy()

    diagnose['selectors']['targetWeightBox']!.value = falsyForBMI.toLocaleString()
    diagnose['selectors']['targetWeightBox']!.dispatchEvent(new Event('input'))
    expect(diagnose.targetWeightValue).toBe(falsyForBMI)
    expect(diagnose.targetWeightValidation).toBeFalsy()
  })

  it('Result', () => {
    const diagnose = new Diagnose()
    diagnose.result()
    diagnose['displayInitialize'] = jest.fn()
    diagnose['mathBasicMetabolism'] = jest.fn()
    diagnose['mathIntakeCalorieForKeep'] = jest.fn()
    diagnose['mathConsumptionCalorieForKeep'] = jest.fn()
    diagnose['mathLoseWeightMonth'] = jest.fn()
    diagnose['mathCalorieForLoseWeightMonth'] = jest.fn()
    diagnose['mathIntakeCalorieForLose'] = jest.fn()
    diagnose['mathConsumptionCalorieForLose'] = jest.fn()
    diagnose['mathGoalDay'] = jest.fn()
    diagnose['displayResult'] = jest.fn()

    diagnose.heightValidation = true
    diagnose.ageValidation = true
    diagnose.currentWeightValidation = true
    diagnose.targetWeightValidation = true

    diagnose['selectors']['diagnoseButton']!.dispatchEvent(new Event('click'))
    expect(diagnose['selectors']['errorBox']?.classList.contains('is-active')).toBeFalsy()
    expect(diagnose['selectors']['resultContents']?.classList.contains('is-active')).toBeTruthy()
    expect(diagnose['selectors']['pending']?.classList.contains('is-deactive')).toBeTruthy()

    diagnose.heightValidation = false
    diagnose.ageValidation = true
    diagnose.currentWeightValidation = true
    diagnose.targetWeightValidation = true

    diagnose['selectors']['diagnoseButton']!.dispatchEvent(new Event('click'))
    expect(diagnose['selectors']['errorBox']?.classList.contains('is-active')).toBeTruthy()
    expect(diagnose['selectors']['resultContents']?.classList.contains('is-active')).toBeFalsy()
    expect(diagnose['selectors']['pending']?.classList.contains('is-deactive')).toBeFalsy()
    expect(diagnose['selectors']['errorBox']?.innerHTML).toBe(`<p class="error-letter fn-error-letter">${diagnose.heightErrorLetter}</p>`)

    diagnose.heightValidation = true
    diagnose.ageValidation = false
    diagnose.currentWeightValidation = true
    diagnose.targetWeightValidation = true

    diagnose['selectors']['diagnoseButton']!.dispatchEvent(new Event('click'))
    expect(diagnose['selectors']['errorBox']?.classList.contains('is-active')).toBeTruthy()
    expect(diagnose['selectors']['resultContents']?.classList.contains('is-active')).toBeFalsy()
    expect(diagnose['selectors']['pending']?.classList.contains('is-deactive')).toBeFalsy()
    expect(diagnose['selectors']['errorBox']?.innerHTML).toBe(`<p class="error-letter fn-error-letter">${diagnose.ageErrorLetter}</p>`)

    diagnose.heightValidation = true
    diagnose.ageValidation = true
    diagnose.currentWeightValidation = false
    diagnose.targetWeightValidation = true

    diagnose['selectors']['diagnoseButton']!.dispatchEvent(new Event('click'))
    expect(diagnose['selectors']['errorBox']?.classList.contains('is-active')).toBeTruthy()
    expect(diagnose['selectors']['resultContents']?.classList.contains('is-active')).toBeFalsy()
    expect(diagnose['selectors']['pending']?.classList.contains('is-deactive')).toBeFalsy()
    expect(diagnose['selectors']['errorBox']?.innerHTML).toBe(`<p class="error-letter fn-error-letter">${diagnose.currentWeightErrorLetter}</p>`)

    diagnose.heightValidation = true
    diagnose.ageValidation = true
    diagnose.currentWeightValidation = true
    diagnose.targetWeightValidation = false

    diagnose['selectors']['diagnoseButton']!.dispatchEvent(new Event('click'))
    expect(diagnose['selectors']['errorBox']?.classList.contains('is-active')).toBeTruthy()
    expect(diagnose['selectors']['resultContents']?.classList.contains('is-active')).toBeFalsy()
    expect(diagnose['selectors']['pending']?.classList.contains('is-deactive')).toBeFalsy()
    expect(diagnose['selectors']['errorBox']?.innerHTML).toBe(`<p class="error-letter fn-error-letter">${diagnose.targetWeightErrorLetter}</p>`)
  })
})
