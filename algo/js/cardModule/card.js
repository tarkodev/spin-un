"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a playing card.
 */
class Card {
    /**
     * Creates an instance of Card.
     * @param color The color of the card.
     */
    constructor(color) {
        this._color = color;
        this._isVisible = false;
        this._loginPlayer = null;
        this._points = -1; //initialized to -1: every subclass defines another value for points
        this._effectToApply = true;
    }
    /**
     * Gets the login player associated with the card.
     * @returns The login player.
     */
    get loginPlayer() {
        return this._loginPlayer;
    }
    /**
     * Gets the color of the card.
     * @returns The color of the card.
     */
    get color() {
        return this._color;
    }
    /**
     * Gets the points assigned to the card.
     * @returns The points assigned to the card.
     */
    get points() {
        return this._points;
    }
    /**
     * Sets the visibility of the card.
     * @param isVisible True to make the card visible, false otherwise.
     */
    set isVisible(isVisible) {
        this._isVisible = isVisible;
    }
    /**
     * Checks if the card is visible.
     * @returns True if the card is visible, false otherwise.
     */
    get isVisible() {
        return this._isVisible;
    }
    /**
     * Sets the login player associated with the card.
     * @param loginPlayer The login player to associate with the card.
     */
    set loginPlayer(loginPlayer) {
        this._loginPlayer = loginPlayer;
    }
    get effectToApply() {
        return this._effectToApply;
    }
    set effectToApply(b) {
        this._effectToApply = b;
    }
}
exports.default = Card;
