import { Injectable, Scope } from "@nestjs/common";

@Injectable({
  scope: Scope.REQUEST
})
export class CookieService {
  private items = []

  constructor() {
    //
  }

  add(item) {
    this.items.push(item)
  }

  get() {
    return this.items
  }
}
