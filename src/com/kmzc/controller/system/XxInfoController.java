package com.kmzc.controller.system;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kmzc.service.common.OperateDataService;
import com.kmzc.utils.CommonUtils;

@Controller
@RequestMapping("/xxinfo")
public class XxInfoController {
	@Autowired
	private OperateDataService optService;

	@RequestMapping("/ql")
	public void sendJsxx(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String ret = "ok";
		List<Map<String, Object>> css = new ArrayList<Map<String, Object>>();
		css.add(new HashMap<String, Object>());
		css.add(new HashMap<String, Object>());
		// 得到发送到后台清理信息条件
		String pkid = request.getParameter("pkids");
		String xxbt = request.getParameter("bt");
		String xxnr = request.getParameter("nr");
		String xxlb = request.getParameter("lb");
		String sfyfj = request.getParameter("fj");
		String sfxyhf = request.getParameter("hf");
		String ydqk = request.getParameter("yd");
		String ydrq1 = request.getParameter("ydrq1");
		String ydrq2 = request.getParameter("ydrq2");
		String fsrq1 = request.getParameter("fsrq1");
		String fsrq2 = request.getParameter("fsrq2");
		String userId = (String) session.getAttribute("userId");
		// 将符合条件的信息放入归档表中
		css.get(0).put("userId", userId);
		css.get(1).put("userId", userId);
		if (pkid != null && pkid.length() > 0) {
			css.get(0).put("pkid", pkid);
			css.get(1).put("pkid", pkid);
		}
		if (xxbt != null && xxbt.length() > 0) {
			css.get(0).put("xxbt", xxbt);
			css.get(1).put("xxbt", xxbt);
		}
		if (xxnr != null && xxnr.length() > 0) {
			css.get(0).put("xxnr", xxnr);
			css.get(1).put("xxnr", xxnr);
		}
		if (xxlb != null && xxlb.length() > 0) {
			css.get(0).put("xxlb", xxlb);
			css.get(1).put("xxlb", xxlb);
		}
		if (sfyfj != null && sfyfj.length() > 0) {
			css.get(0).put("fjqk", sfyfj);
			css.get(1).put("fjqk", sfyfj);
		}
		if (sfxyhf != null && sfxyhf.length() > 0) {
			css.get(0).put("hfqk", sfxyhf);
			css.get(1).put("hfqk", sfxyhf);
		}
		if (ydqk != null && ydqk.length() > 0) {
			css.get(0).put("ydqk", ydqk);
			css.get(1).put("ydqk", ydqk);
		}
		if (ydrq1 != null && ydrq1.length() > 0) {
			Date rq1 = null;
			try {
				if (ydrq1.length() == 10) {
					rq1 = CommonUtils.parseDate(ydrq1);
				} else if (ydrq1.length() == 19) {
					rq1 = CommonUtils.parseDateTime(ydrq1);
				} else {
					ret = "阅读日期起格式有问题，无法正常解析。";
				}
				if (rq1 != null) {
					css.get(0).put("ydrqq", ydrq1);
					css.get(1).put("ydrqq", ydrq1);
				}
			} catch (Exception e) {
				ret = "阅读日期起格式有问题，无法正常解析。";
			}
		}
		if (ydrq2 != null && ydrq2.length() > 0) {
			Date rq = null;
			try {
				if (ydrq2.length() == 10) {
					rq = CommonUtils.parseDate(ydrq2);
				} else if (ydrq2.length() == 19) {
					rq = CommonUtils.parseDateTime(ydrq2);
				} else {
					ret = "阅读日期止格式有问题，无法正常解析。";
				}
				if (rq != null) {
					css.get(0).put("ydrqz", fsrq2);
					css.get(1).put("ydrqz", fsrq2);
				}
			} catch (Exception e) {
				ret = "阅读日期止格式有问题，无法正常解析。";
			}
		}
		if (fsrq1 != null && fsrq1.length() > 0) {
			Date rq = null;
			try {
				if (fsrq1.length() == 10) {
					rq = CommonUtils.parseDate(fsrq1);
				} else if (fsrq1.length() == 19) {
					rq = CommonUtils.parseDateTime(fsrq1);
				} else {
					ret = "发送日期起格式有问题，无法正常解析。";
				}
				if (rq != null) {
					css.get(0).put("rqq", fsrq1);
					css.get(1).put("rqq", fsrq1);
				}
			} catch (Exception e) {
				ret = "发送日期起格式有问题，无法正常解析。";
			}
		}
		if (fsrq2 != null && fsrq2.length() > 0) {
			Date rq = null;
			try {
				if (fsrq2.length() == 10) {
					rq = CommonUtils.parseDate(fsrq2);
				} else if (fsrq2.length() == 19) {
					rq = CommonUtils.parseDateTime(fsrq2);
				} else {
					ret = "发送日期止格式有问题，无法正常解析。";
				}
				if (rq != null) {
					css.get(0).put("rqz", fsrq2);
					css.get(1).put("rqz", fsrq2);
				}
			} catch (Exception e) {
				ret = "发送日期止格式有问题，无法正常解析。";
			}
		}

		if ("ok".equals(ret)) {
			if (css.get(0).size() < 0) {
				ret = "清理条件不能全部为空，没有执行清理工作。";
			} else {
				String[] sqls = new String[2];
				sqls[0] = "com.kmzc.dao.xx.XxMapper.insertXxBak";
				sqls[1] = "com.kmzc.dao.xx.XxMapper.delXx";
				List<Integer> retNum = optService.operateSqls(sqls, css);
				ret = "您已成功清理信息" + retNum.get(0) + "条。";
			}
		}

		// 操作完成后返回信息
		response.setContentType("html/text;charset=UTF-8");
		try {
			response.getWriter().print(ret);
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
	}
}
