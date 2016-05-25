<?php

/* @Framework/Form/form_end.html.php */
class __TwigTemplate_d33c8d44635602569ade3be7904ba9a319e5b3cc76eebd0ee2b5c96c279b0751 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_b920b282aded13b303795141866dd00e4611f3eac54d67f0f98b01aecde5461f = $this->env->getExtension("native_profiler");
        $__internal_b920b282aded13b303795141866dd00e4611f3eac54d67f0f98b01aecde5461f->enter($__internal_b920b282aded13b303795141866dd00e4611f3eac54d67f0f98b01aecde5461f_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/form_end.html.php"));

        // line 1
        echo "<?php if (!isset(\$render_rest) || \$render_rest): ?>
<?php echo \$view['form']->rest(\$form) ?>
<?php endif ?>
</form>
";
        
        $__internal_b920b282aded13b303795141866dd00e4611f3eac54d67f0f98b01aecde5461f->leave($__internal_b920b282aded13b303795141866dd00e4611f3eac54d67f0f98b01aecde5461f_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/form_end.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <?php if (!isset($render_rest) || $render_rest): ?>*/
/* <?php echo $view['form']->rest($form) ?>*/
/* <?php endif ?>*/
/* </form>*/
/* */
