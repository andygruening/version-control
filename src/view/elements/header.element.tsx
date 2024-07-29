interface HeaderProps {
    title: string;
}

function Header(props: HeaderProps) {
    return (
        <p className={'header'}>{props.title}</p>
    )
}

export default Header;