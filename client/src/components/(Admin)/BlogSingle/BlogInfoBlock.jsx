import styles from '@/components/(Admin)/RightBar/RightBar.module.scss';
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import DescBlock from "@/components/(Admin)/DescBlock/DescBlock";
import PostBannerBlock from '@/components/(Admin)/PostBannerBlock/PostBannerBlock';
import BlogCategoryList from '@/components/(Admin)/BlogSingle/BlogCategoryList';
import QuillComponent from "@/components/(Admin)/QuillComponent/QuillComponent";
import InputField from '@/components/(Admin)/InputField/InputField'

const BlogInfoBlock = ({ sectionTitle, selectedFile, sectionTitleVal, shortDescVal, ovwTextVal, blogContent, categories, publishDate, handleInputChange, errorMessage, handleCategoryClick, topNews }) => {
    return (
        <div className={`${styles['admin-pg-block']}`}>
            <div className='fx fx-jb'>
                <h3>{sectionTitle}</h3>
                <div className={`${styles['news-top-box']}`}>
                    <a 
                        className={`fx fx-ac fx-jb`}
                    >
                        <div className={`${styles['news-inp']} fx`}>
                            <InputField 
                                type="checkbox"
                                id={`top-news`}
                                checked={topNews === '1' ? 'checked' : false}
                                onChange={(e) => handleInputChange('top_news', e.target.checked ? '1' : '0')}
                            />
                        </div>
                        <label htmlFor={`top-news`}>Make as Top News</label>
                    </a>
                </div>
            </div>
            <div className={`${styles['admin-pg-wrap']} fwidth`}>
                <TitleBlock
                    sectionTitle="Article Title"
                    sectionTitleVal={sectionTitleVal}
                    inputID="blog-title"
                    inputPlaceholder="Add your title here..."
                    onChange={(event) => handleInputChange('title', event.target.value)}
                />
                <PostBannerBlock
                    sectionTitle="Banner"
                    selectedFile={selectedFile}
                    inputID="blog-banner-file"
                    inputFileID='banner'
                    handleInputChange={handleInputChange}
                    errorMessage={errorMessage}
                />
                <TitleBlock
                    sectionTitle="Article Date"
                    sectionTitleVal={publishDate.slice(0, 10)}
                    inputID="blog-date"
                    inputPlaceholder="Add your date here..."
                    inputType="date"
                    onChange={(event) => handleInputChange('date', event.target.value)}
                />
                <DescBlock
                    sectionTitle="Short Description"
                    sectionTitleVal={shortDescVal}
                    inputId="blog-short-desc"
                    inputName="blog-short-desc"
                    onChange={(event) => handleInputChange('short_desc', event.target.value)}
                />
                <DescBlock
                    sectionTitle="Overview Text"
                    sectionTitleVal={ovwTextVal}
                    inputId="blog-ovw-desc"
                    inputName="blog-ovw-desc"
                    onChange={(event) => handleInputChange('ovw_text', event.target.value)}
                />
                <QuillComponent
                    value={blogContent}
                    id="blog-content"
                    name="blog-content"
                    onChange={(event) => handleInputChange('content', event)}
                />
                <BlogCategoryList
                    sectionTitle="Article Categories"
                    categories={categories}
                    onCategoryClick={handleCategoryClick}
                />
            </div>
        </div>
    )
}

export default BlogInfoBlock;