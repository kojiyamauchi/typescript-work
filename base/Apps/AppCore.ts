/*
 AppCore.ts
*/

// Import Modules.
import Diagnose from '@/Modules/Privates/Diagnose'
import AnchorLink from '@/Modules/Privates/AnchorLink'
import JumpTop from '@/Modules/Privates/JumpTop'

export default class AppCore {
  // Types.
  private selectors: {
    readonly toCheck: NodeListOf<HTMLElement>
    readonly anchorCheck: HTMLElement | null
    readonly toStudy: NodeListOf<HTMLElement>
    readonly anchorStudy: HTMLElement | null
    readonly toColumn: NodeListOf<HTMLElement>
    readonly anchorColumn: HTMLElement | null
  }

  private readonly diagnose: Diagnose
  private readonly anchorCheck: AnchorLink
  private readonly anchorStudy: AnchorLink
  private readonly anchorColumn: AnchorLink
  private readonly jumpTop: JumpTop

  public constructor() {
    this.selectors = {
      toCheck: document.querySelectorAll('.fn-to-check'),
      anchorCheck: document.querySelector('.fn-anchor-check'),
      toStudy: document.querySelectorAll('.fn-to-study'),
      anchorStudy: document.querySelector('.fn-anchor-study'),
      toColumn: document.querySelectorAll('.fn-to-column'),
      anchorColumn: document.querySelector('.fn-anchor-column')
    }
    this.diagnose = new Diagnose()
    this.anchorCheck = new AnchorLink(this.selectors.toCheck, this.selectors.anchorCheck)
    this.anchorStudy = new AnchorLink(this.selectors.toStudy, this.selectors.anchorStudy)
    this.anchorColumn = new AnchorLink(this.selectors.toColumn, this.selectors.anchorColumn)
    this.jumpTop = new JumpTop()
  }

  public init(): void {
    this.diagnose.init()
    this.diagnose.setGender()
    this.diagnose.setHeight()
    this.diagnose.setAge()
    this.diagnose.setCurrentWeight()
    this.diagnose.setTargetWeight()
    this.diagnose.result()
    this.anchorCheck.core()
    this.anchorStudy.core()
    this.anchorColumn.core()
    this.jumpTop.toTop()
  }

  public domContentLoaded(): void {
    // Add DOM Content Loaded Method.
  }

  public load(): void {
    // Add Load Method.
  }

  public resize(): void {
    // Add Resize Method.
  }

  public scroll(): void {
    this.jumpTop.showBtn()
  }
}
