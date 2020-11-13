/*

 Diagnose.ts

*/

export default class Diagnose {
  private selectors: {
    readonly genderButton: NodeListOf<HTMLButtonElement> | null
    readonly heightBox: HTMLInputElement | null
    readonly ageBox: HTMLInputElement | null
    readonly currentWeightBox: HTMLInputElement | null
    readonly targetWeightBox: HTMLInputElement | null
    readonly diagnoseButton: HTMLButtonElement | null
    readonly errorBox: HTMLElement | null
    readonly resultContents: HTMLElement | null
    readonly pending: HTMLElement | null
    readonly startResult: HTMLElement | null
    readonly targetResult: HTMLElement | null
    readonly yearResult: HTMLElement | null
    readonly monthResult: HTMLElement | null
    readonly dayResult: HTMLElement | null
    readonly intakeResult: HTMLElement | null
    readonly consumptionResult: HTMLElement | null
  }

  private state: {
    gender: {
      value: number | null
    }
    height: {
      value: number | null
      readonly min: number
      readonly max: number
      validation: boolean
      readonly errorLetter: string
    }
    age: {
      value: number | null
      readonly min: number
      readonly max: number
      validation: boolean
      readonly errorLetter: string
    }
    currentWeight: {
      value: number | null
      readonly min: number
      readonly max: number
      validation: boolean
      readonly errorLetter: string
    }
    targetWeight: {
      value: number | null
      readonly minBMI: number
      maxWeight: number | null
      validation: boolean
      readonly errorLetter: string
    }
    basicMetabolism: number | null
    intakeCalorieForKeep: number | null
    consumptionCalorieForKeep: number | null
    loseWeightMonth: number | null
    calorieForLoseWeightMonth: number | null
    intakeCalorieForLose: number | null
    consumptionCalorieForLose: number | null
    goalDay: number | null
  }

  public constructor() {
    this.selectors = {
      genderButton: document.querySelectorAll('.fn-gender-button'),
      heightBox: document.querySelector('.fn-height-box'),
      ageBox: document.querySelector('.fn-age-box'),
      currentWeightBox: document.querySelector('.fn-current-weight-box'),
      targetWeightBox: document.querySelector('.fn-target-weight-box'),
      diagnoseButton: document.querySelector('.fn-diagnosis-button'),
      errorBox: document.querySelector('.fn-error-box'),
      resultContents: document.querySelector('.fn-result'),
      pending: document.querySelector('.fn-pending'),
      startResult: document.querySelector('.fn-start-result'),
      targetResult: document.querySelector('.fn-target-result'),
      yearResult: document.querySelector('.fn-year-result'),
      monthResult: document.querySelector('.fn-month-result'),
      dayResult: document.querySelector('.fn-day-result'),
      intakeResult: document.querySelector('.fn-intake-result'),
      consumptionResult: document.querySelector('.fn-consumption-result')
    }
    this.state = {
      gender: {
        value: null
      },
      height: {
        value: null,
        min: 140,
        max: 200,
        validation: false,
        errorLetter: '身長は140㎝~200㎝の間で入力できます。'
      },
      age: {
        value: null,
        min: 15,
        max: 100,
        validation: false,
        errorLetter: '年齢は15歳~100歳の間で入力できます。'
      },
      currentWeight: {
        value: null,
        min: 30,
        max: 200,
        validation: false,
        errorLetter: '現体重は30kg~200kgの間で入力できます。'
      },
      targetWeight: {
        value: null,
        minBMI: 18.5,
        maxWeight: null,
        validation: false,
        errorLetter: 'BMI18.5未満および現体重より大きい数値は入力できません。'
      },
      basicMetabolism: null,
      intakeCalorieForKeep: null,
      consumptionCalorieForKeep: null,
      loseWeightMonth: null,
      calorieForLoseWeightMonth: null,
      intakeCalorieForLose: null,
      consumptionCalorieForLose: null,
      goalDay: null
    }
  }

  get genderValue(): number | null {
    return this.state.gender.value
  }

  set genderValue(arg: number | null) {
    this.state.gender.value = arg
  }

  get heightValue(): number | null {
    return this.state.height.value
  }

  set heightValue(arg: number | null) {
    this.state.height.value = arg
  }

  get heightMin(): number {
    return this.state.height.min
  }

  get heightMax(): number {
    return this.state.height.max
  }

  get heightValidation(): boolean {
    return this.state.height.validation
  }

  set heightValidation(arg: boolean) {
    this.state.height.validation = arg
  }

  get heightErrorLetter(): string {
    return this.state.height.errorLetter
  }

  get ageValue(): number | null {
    return this.state.age.value
  }

  set ageValue(arg: number | null) {
    this.state.age.value = arg
  }

  get ageMin(): number {
    return this.state.age.min
  }

  get ageMax(): number {
    return this.state.age.max
  }

  get ageValidation(): boolean {
    return this.state.age.validation
  }

  set ageValidation(arg: boolean) {
    this.state.age.validation = arg
  }

  get ageErrorLetter(): string {
    return this.state.age.errorLetter
  }

  get currentWeightValue(): number | null {
    return this.state.currentWeight.value
  }

  set currentWeightValue(arg: number | null) {
    this.state.currentWeight.value = arg
  }

  get currentWeightMin(): number {
    return this.state.currentWeight.min
  }

  get currentWeightMax(): number {
    return this.state.currentWeight.max
  }

  get currentWeightValidation(): boolean {
    return this.state.currentWeight.validation
  }

  set currentWeightValidation(arg: boolean) {
    this.state.currentWeight.validation = arg
  }

  get currentWeightErrorLetter(): string {
    return this.state.currentWeight.errorLetter
  }

  get targetWeightValue(): number | null {
    return this.state.targetWeight.value
  }

  set targetWeightValue(arg: number | null) {
    this.state.targetWeight.value = arg
  }

  get targetWeightMinBMI(): number {
    return this.state.targetWeight.minBMI
  }

  get targetWeightMaxWeight(): number | null {
    return this.state.targetWeight.maxWeight
  }

  set targetWeightMaxWeight(arg: number | null) {
    this.state.targetWeight.maxWeight = arg
  }

  get targetWeightValidation(): boolean {
    return this.state.targetWeight.validation
  }

  set targetWeightValidation(arg: boolean) {
    this.state.targetWeight.validation = arg
  }

  get targetWeightErrorLetter(): string {
    return this.state.targetWeight.errorLetter
  }

  set basicMetabolism(arg: number) {
    this.state.basicMetabolism = arg
  }

  get basicMetabolism(): number {
    return this.state.basicMetabolism!
  }

  set intakeCalorieForKeep(arg: number) {
    this.state.intakeCalorieForKeep = arg
  }

  get intakeCalorieForKeep(): number {
    return this.state.intakeCalorieForKeep!
  }

  set consumptionCalorieForKeep(arg: number) {
    this.state.consumptionCalorieForKeep = arg
  }

  get consumptionCalorieForKeep(): number {
    return this.state.consumptionCalorieForKeep!
  }

  set loseWeightMonth(arg: number) {
    this.state.loseWeightMonth = arg
  }

  get loseWeightMonth(): number {
    return this.state.loseWeightMonth!
  }

  set calorieForLoseWeightMonth(arg: number) {
    this.state.calorieForLoseWeightMonth = arg
  }

  get calorieForLoseWeightMonth(): number {
    return this.state.calorieForLoseWeightMonth!
  }

  set intakeCalorieForLose(arg: number) {
    this.state.intakeCalorieForLose = arg
  }

  get intakeCalorieForLose(): number {
    return this.state.intakeCalorieForLose!
  }

  set consumptionCalorieForLose(arg: number) {
    this.state.consumptionCalorieForLose = arg
  }

  get consumptionCalorieForLose(): number {
    return this.state.consumptionCalorieForLose!
  }

  set goalDay(arg: number) {
    this.state.goalDay = arg
  }

  get goalDay(): number {
    return this.state.goalDay!
  }

  private mathBMI(weight: number, height: number | null): number {
    const convertHeight = height! * 0.01
    const result = weight / convertHeight ** 2
    return result
  }

  private mathBasicMetabolism(weight: number, height: number, age: number, gender: number): number {
    const convertHeight = height * 0.01
    const convertWeight = this.mathBMI(weight, height) < this.targetWeightMinBMI ? convertHeight ** 2 * this.targetWeightMinBMI : weight
    const result = Math.round(((0.1238 + 0.0481 * convertWeight + 0.0234 * height - 0.0138 * age - 0.5473 * gender) * 1000) / 4.186)
    return result
  }

  private mathIntakeCalorieForKeep(basicMetabolism: number): number {
    const coefficient = 1.5
    const result = Math.round(basicMetabolism * coefficient)
    return result
  }

  private mathConsumptionCalorieForKeep(currentWeight: number): number {
    const result = Math.round(currentWeight * 1.05 * 3.3)
    return result
  }

  private mathLoseWeightMonth(currentWeight: number): number {
    const result = currentWeight * 0.015
    return result
  }

  private mathCalorieForLoseWeightMonth(loseWeightMonth: number): number {
    const result = (loseWeightMonth * 7000) / 30
    return result
  }

  private mathIntakeCalorieForLose(intakeCalorieForKeep: number, calorieForLoseWeightMonth: number): number {
    const result = Math.floor(intakeCalorieForKeep - calorieForLoseWeightMonth * 0.7)
    return result
  }

  private mathConsumptionCalorieForLose(consumptionCalorieForKeep: number, calorieForLoseWeightMonth: number): number {
    const result = Math.floor(consumptionCalorieForKeep + calorieForLoseWeightMonth * 0.3)
    return result
  }

  private mathGoalDay(currentWeight: number, targetWeight: number, loseWeightMonth: number): number {
    const result = Math.floor(((currentWeight - targetWeight) / loseWeightMonth) * 10) / 10
    return result
  }

  private displayInitialize(): void {
    this.selectors.startResult!.textContent = '--'
    this.selectors.targetResult!.textContent = '--'
    this.selectors.yearResult!.textContent = '----'
    this.selectors.monthResult!.textContent = '--'
    this.selectors.dayResult!.textContent = '--'
    this.selectors.intakeResult!.textContent = '---'
    this.selectors.consumptionResult!.textContent = '---'
  }

  private displayResult(goalDay: number, currentWeight: number, targetWeight: number, intakeCalorieForLose: number, consumptionCalorieForLose: number): void {
    const pickMonth = Math.floor(goalDay)
    const pickDay = Math.round(30 * (goalDay - pickMonth))
    const today = new Date()
    today.setMonth(today.getMonth() + pickMonth)
    today.setDate(today.getDate() + pickDay)
    this.selectors.startResult!.textContent = currentWeight.toLocaleString().replace(/,/g, '')
    this.selectors.targetResult!.textContent = targetWeight.toLocaleString().replace(/,/g, '')
    this.selectors.yearResult!.textContent = today.getFullYear().toLocaleString().replace(/,/g, '')
    this.selectors.monthResult!.textContent = (today.getMonth() + 1).toLocaleString().replace(/,/g, '')
    this.selectors.dayResult!.textContent = today.getDate().toLocaleString().replace(/,/g, '')
    this.selectors.intakeResult!.textContent = intakeCalorieForLose.toLocaleString().replace(/,/g, '')
    this.selectors.consumptionResult!.textContent = consumptionCalorieForLose.toLocaleString().replace(/,/g, '')
  }

  public init(): void {
    Array.from(this.selectors.genderButton!, (selector): void => {
      if (selector.classList.contains('is-active')) this.genderValue = Number(selector.value)
    })
    this.heightValue = Number(this.selectors.heightBox!.value)
    this.heightValidation = true
    this.ageValue = Number(this.selectors.ageBox!.value)
    this.ageValidation = true
    this.currentWeightValue = Number(this.selectors.currentWeightBox!.value)
    this.currentWeightValidation = true
    this.targetWeightValue = Number(this.selectors.targetWeightBox!.value)
    this.targetWeightValidation = true
  }

  public setGender(): void {
    Array.from(this.selectors.genderButton!, (selector): void => {
      selector.addEventListener('click', (event): void => {
        Array.from(this.selectors.genderButton!, (selector): void => selector.classList.remove('is-active'))
        if (event.currentTarget instanceof HTMLButtonElement) {
          event.currentTarget!.classList.add('is-active')
          this.genderValue = Number(event.currentTarget!.value!)
          event.preventDefault()
        }
      })
    })
  }

  public setHeight(): void {
    this.selectors.heightBox!.addEventListener('input', (event): void => {
      if (event.currentTarget instanceof HTMLInputElement) {
        this.heightValue = Number(event.currentTarget.value)
        this.heightValidation = this.heightValue >= this.heightMin && this.heightValue <= this.heightMax
      }
      // && Target Weight Validation.
      this.targetWeightValue = Number(this.selectors.targetWeightBox!.value)
      this.targetWeightMaxWeight = Number(this.selectors.currentWeightBox!.value)
      const resultBMI = this.mathBMI(this.targetWeightValue, this.heightValue)
      this.targetWeightValidation = this.targetWeightValue <= this.targetWeightMaxWeight! && resultBMI! >= this.targetWeightMinBMI
    })
  }

  public setAge(): void {
    this.selectors.ageBox!.addEventListener('input', (event): void => {
      if (event.currentTarget instanceof HTMLInputElement) {
        this.ageValue = Number(event.currentTarget.value)
        this.ageValidation = this.ageValue >= this.ageMin && this.ageValue <= this.ageMax
      }
    })
  }

  public setCurrentWeight(): void {
    this.selectors.currentWeightBox!.addEventListener('input', (event): void => {
      if (event.currentTarget instanceof HTMLInputElement) {
        this.currentWeightValue = Number(event.currentTarget.value)
        this.currentWeightValidation = this.currentWeightValue >= this.currentWeightMin && this.currentWeightValue <= this.currentWeightMax
      }
      // && Target Weight Validation.
      this.targetWeightValue = Number(this.selectors.targetWeightBox!.value)
      this.targetWeightMaxWeight = this.currentWeightValue
      const resultBMI = this.mathBMI(this.targetWeightValue, Number(this.selectors.heightBox!.value))
      this.targetWeightValidation = this.targetWeightValue <= this.targetWeightMaxWeight! && resultBMI! >= this.targetWeightMinBMI
    })
  }

  public setTargetWeight(): void {
    this.selectors.targetWeightBox!.addEventListener('input', (event): void => {
      if (event.currentTarget instanceof HTMLInputElement) {
        this.targetWeightValue = Number(event.currentTarget.value)
        this.targetWeightMaxWeight = Number(this.selectors.currentWeightBox!.value)
        const resultBMI = this.mathBMI(this.targetWeightValue, Number(this.selectors.heightBox!.value))
        this.targetWeightValidation = this.targetWeightValue <= this.targetWeightMaxWeight! && resultBMI! >= this.targetWeightMinBMI
      }
    })
  }

  public result(): void {
    this.selectors.diagnoseButton?.addEventListener('click', () => {
      this.displayInitialize()
      Array.from(document.querySelectorAll('.fn-error-letter'), (letter) => this.selectors.errorBox!.removeChild(letter))
      this.selectors.errorBox?.classList.remove('is-active')
      this.selectors.resultContents?.classList.remove('is-active')
      this.selectors.pending?.classList.remove('is-deactive')

      if (!this.heightValidation) {
        this.selectors.errorBox?.classList.add('is-active')
        this.selectors.errorBox!.insertAdjacentHTML('beforeend', `<p class="error-letter fn-error-letter">${this.heightErrorLetter}</p>`)
      }
      if (!this.ageValidation) {
        this.selectors.errorBox?.classList.add('is-active')
        this.selectors.errorBox!.insertAdjacentHTML('beforeend', `<p class="error-letter fn-error-letter">${this.ageErrorLetter}</p>`)
      }
      if (!this.currentWeightValidation) {
        this.selectors.errorBox?.classList.add('is-active')
        this.selectors.errorBox!.insertAdjacentHTML('beforeend', `<p class="error-letter fn-error-letter">${this.currentWeightErrorLetter}</p>`)
      }
      if (!this.targetWeightValidation) {
        this.selectors.errorBox?.classList.add('is-active')
        this.selectors.errorBox!.insertAdjacentHTML('beforeend', `<p class="error-letter fn-error-letter">${this.targetWeightErrorLetter}</p>`)
      }

      if (this.heightValidation && this.ageValidation && this.currentWeightValidation && this.targetWeightValidation) {
        this.selectors.resultContents?.classList.add('is-active')
        this.selectors.pending?.classList.add('is-deactive')
        this.basicMetabolism = this.mathBasicMetabolism(this.currentWeightValue!, this.heightValue!, this.ageValue!, this.genderValue!)
        this.intakeCalorieForKeep = this.mathIntakeCalorieForKeep(this.basicMetabolism)
        this.consumptionCalorieForKeep = this.mathConsumptionCalorieForKeep(this.currentWeightValue!)
        this.loseWeightMonth = this.mathLoseWeightMonth(this.currentWeightValue!)
        this.calorieForLoseWeightMonth = this.mathCalorieForLoseWeightMonth(this.loseWeightMonth)
        this.intakeCalorieForLose = this.mathIntakeCalorieForLose(this.intakeCalorieForKeep, this.calorieForLoseWeightMonth)
        this.consumptionCalorieForLose = this.mathConsumptionCalorieForLose(this.consumptionCalorieForKeep, this.calorieForLoseWeightMonth)
        this.goalDay = this.mathGoalDay(this.currentWeightValue!, this.targetWeightValue!, this.loseWeightMonth)
        this.displayResult(this.goalDay, this.currentWeightValue!, this.targetWeightValue!, this.intakeCalorieForLose, this.consumptionCalorieForLose)
      }
    })
  }
}
