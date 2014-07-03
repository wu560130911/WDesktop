/*
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 * 
 * 本文件使用struts2默认的拦截器，但增加了个人所需的文件
 * 
 */
package com.wms.movie.tools;

import java.io.IOException;
import java.util.List;
import java.util.regex.Pattern;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.dispatcher.Dispatcher;
import org.apache.struts2.dispatcher.mapper.ActionMapping;
import org.apache.struts2.dispatcher.ng.ExecuteOperations;
import org.apache.struts2.dispatcher.ng.InitOperations;
import org.apache.struts2.dispatcher.ng.PrepareOperations;
import org.apache.struts2.dispatcher.ng.filter.FilterHostConfig;

/**
 * <dt><b>描述:</b></dt> <dd>本文件为过滤器，过滤所有请求，主要文件为struts2提供，但增加了个人的一些设置。</dd>
 * 
 * @author WMS
 * @version 3.3
 * 
 */
public class WMSFilter implements StrutsStatics, Filter {
	protected PrepareOperations prepare;
	protected ExecuteOperations execute;
	protected List<Pattern> excludedPatterns = null;
	//private Logger log = Logger.getLogger(getClass());
	/**
	 * 过滤器初始化，主要是设置一些属性和值
	 */
	public void init(FilterConfig filterConfig) throws ServletException {
		InitOperations init = new InitOperations();
		try {
			FilterHostConfig config = new FilterHostConfig(filterConfig);
			init.initLogging(config);
			Dispatcher dispatcher = init.initDispatcher(config);
			init.initStaticContentLoader(config, dispatcher);

			prepare = new PrepareOperations(filterConfig.getServletContext(),
					dispatcher);
			execute = new ExecuteOperations(filterConfig.getServletContext(),
					dispatcher);
			this.excludedPatterns = init.buildExcludedPatternsList(dispatcher);

			postInit(dispatcher, filterConfig);
		} finally {
			init.cleanup();
		}

	}

	/**
	 * Callback for post initialization
	 */
	protected void postInit(Dispatcher dispatcher, FilterConfig filterConfig) {
	}

	/**
	 * 过滤器开始工作，过滤一些请求
	 * 
	 * @param req
	 *            request
	 * @param res
	 *            response
	 * @param chain
	 *            FilterChain
	 */
	public void doFilter(ServletRequest req, ServletResponse res,
			FilterChain chain) throws IOException, ServletException {

		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;

		String url = request.getRequestURI();

		try {
			prepare.setEncodingAndLocale(request, response);
			prepare.createActionContext(request, response);
			prepare.assignDispatcherToThread();

			HttpSession session = request.getSession(false);
			
			if(session==null&&!url.endsWith("user_checklogin.action")&&!url.endsWith("user_login.action")&&!url.endsWith("user_register.action")){
				response.sendRedirect("login.jsp");
				return ;
			}
			
			if ((excludedPatterns != null && prepare.isUrlExcluded(request,
					excludedPatterns))) {
				chain.doFilter(request, response);
			} else{
				request = prepare.wrapRequest(request);
				ActionMapping mapping = prepare.findActionMapping(request,
						response, true);
				if (mapping == null) {
					boolean handled = execute.executeStaticResourceRequest(
							request, response);
					if (!handled) {
						chain.doFilter(request, response);
					}
				} else {
					execute.executeAction(request, response, mapping);
				}
			}
		}finally {
			prepare.cleanupRequest(request);
		}
	}

	/**
	 * 过滤器销毁
	 */
	public void destroy() {
		prepare.cleanupDispatcher();
	}
}
