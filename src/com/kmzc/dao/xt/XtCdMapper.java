package com.kmzc.dao.xt;

import java.util.List;

import com.kmzc.entity.xt.XtCd;

public interface XtCdMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table xt_cd
     *
     * @mbg.generated Thu Mar 29 16:28:46 CST 2018
     */
    int deleteByPrimaryKey(String pkid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table xt_cd
     *
     * @mbg.generated Thu Mar 29 16:28:46 CST 2018
     */
    int insert(XtCd record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table xt_cd
     *
     * @mbg.generated Thu Mar 29 16:28:46 CST 2018
     */
    XtCd selectByPrimaryKey(String pkid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table xt_cd
     *
     * @mbg.generated Thu Mar 29 16:28:46 CST 2018
     */
    List<XtCd> selectAll();

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table xt_cd
     *
     * @mbg.generated Thu Mar 29 16:28:46 CST 2018
     */
    int updateByPrimaryKey(XtCd record);
}