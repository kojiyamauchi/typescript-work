/*

 AnchorLink.ts

*/

// Import Package Modules.
import jump from 'jump.js'

export default class AnchorLink {
  private readonly anchorButton: NodeListOf<HTMLElement> | null
  private readonly anchorSelector: HTMLElement | null

  public constructor(anchorButton: NodeListOf<HTMLElement> | null, anchorSelector: HTMLElement | null) {
    this.anchorButton = anchorButton
    this.anchorSelector = anchorSelector
  }

  public core(): void {
    if (this.anchorButton!.length > 0) {
      Array.from(this.anchorButton!, (selector): void => {
        selector.addEventListener('click', (event): void => {
          jump(this.anchorSelector!, { offset: -35 })
          event.preventDefault()
        })
      })
    }
  }
}
