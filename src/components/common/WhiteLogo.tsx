import './css/logos.css'
import BlueLogoImg from '../../assets/WhiteLogo.svg'

export const WhiteLogo = () => {
    return (
        <div className='flex center' >
            <img src={BlueLogoImg} className='blueLogo' alt="logoImg" />
            <div className="bluelogoText flex column">
                <h3 className='light-font'>Company Nmae</h3>
                <h4 className='light-font'>Visitor Mnagement</h4>
            </div>
        </div>
    )
}