import PromptCard from './PromptCard';
const PromptCardList = ({ data, handleEdit, handleDelete, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleEdit={() => handleEdit && handleEdit(post)}
                    handleDelete={() => handleDelete && handleDelete(post)}
                    handleTagClick={() => handleTagClick && handleTagClick(post.tag)}
                />
            ))}
        </div>
    );
};
export default PromptCardList;