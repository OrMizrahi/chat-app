const Search = (props) => {
    return (
        <div className='ui search'>
            <input className='prompt' type='text' {...props} />
            <div className='results'></div>
        </div>
    );
};

Search.defaultProps = {
    placeholder: 'Search ...',
};

export default Search;
