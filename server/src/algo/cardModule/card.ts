/**
 * Represents a playing card.
 */
export default abstract class Card {
    /**
     * The number value of the card.
     * Value of number :
     *      - numeroted cards (and spin) : 0 to 9.
     *      - skip : 10
     *      - turnDirection : 11
     *      - addTwo : 12
     *      - joker : 13
     *      - superJoker : 14
     */

    protected _isSpin : boolean;

    
    protected _number: number;

    /**
     * The color of the card.
     */
    protected _color: string;

    /**
     * Indicates if the card is visible or not.
     */
    protected _isVisible: boolean;

    /**
     * The login player associated with the card, if any.
     */
    protected _loginPlayer: string | null;

    /**
     * The points assigned to the card.
     * Initialized to -1; subclasses define another value for points.
     */
    protected _points : number;

    protected _effectToApply : boolean;

    /**
     * Creates an instance of Card.
     * @param color The color of the card. 
     */
    constructor(color: string) {
        this._color = color;
        this._isVisible = false;
        this._loginPlayer = null;
        this._points = -1;  //initialized to -1: every subclass defines another value for points
        this._effectToApply = true;
    }
    
    /**
     * Gets the login player associated with the card.
     * @returns The login player.
     */
    public get loginPlayer(): string | null {
        return this._loginPlayer;
    }

    /**
     * Gets the number value of the card.
     * @returns The number value of the card.
     */
    public get number(): number {
        return this._number;
    }

    /**
     * Gets the color of the card.
     * @returns The color of the card.
     */
    public get color(): string {
        return this._color;
    }

    /**
     * Gets the points assigned to the card.
     * @returns The points assigned to the card.
     */
    public get points(): number {
        return this._points;
    }

    /**
     * Sets the visibility of the card.
     * @param isVisible True to make the card visible, false otherwise.
     */
    public set isVisible(isVisible: boolean) {
            this._isVisible = isVisible;
        }

    /**
     * Checks if the card is visible.
     * @returns True if the card is visible, false otherwise.
     */
    public get isVisible(): boolean {
        return this._isVisible;
    }

    
    /**
     * Sets the login player associated with the card.
     * @param loginPlayer The login player to associate with the card.
     */
    public set loginPlayer(loginPlayer: string | null){
        this._loginPlayer = loginPlayer;
    }

    public get effectToApply(): boolean{
        return this._effectToApply;
    }

    public set effectToApply(b: boolean){
        this._effectToApply = b;
    }

    /**
     * Displays information about the card.
     * This method must be implemented by subclasses.
     * @returns A string representing characteristics of the card.
     */
    abstract displayInfo(): string;
}
