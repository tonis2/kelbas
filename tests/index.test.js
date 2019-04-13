import test from "tape"
import { HTML, FRAGMENT } from "../build/kelbas.esm.js"

test("Should create container", t => {
    const element = HTML`<div id="container"></div>`
    t.equal(element.getAttribute("id"), "container")
    t.pass("Container created correctly")
    t.end()
})

test("Should create fragment", t => {
    const element = FRAGMENT`<div></div><div></div><div></div><div></div>`
    t.equal(element.children.length, 4)
    t.pass("Fragment created with 4 children")
    t.end()
})

test("Test click events", t => {
    let status = false
    const update_state = () => {
        status = true
    }
    const element = HTML`<div id="test" onclick=${update_state}></div>`
    element.click()
    t.equal(status, true)
    t.pass("Click event worked")
    t.end()
})

